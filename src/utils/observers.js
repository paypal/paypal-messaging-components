import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getGlobalState, createGlobalVariableGetter } from './global';
import { dynamicImport, getCurrentTime } from './miscellaneous';
import { awaitWindowLoad, awaitFirstRender } from './events';
import { logger } from './logger';
import { getNamespace } from './sdk';
import { getRoot, elementContains, isElement } from './elements';

export const getInsertionObserver = createGlobalVariableGetter(
    '__insertion_observer__',
    () =>
        new MutationObserver(mutationList => {
            const newMessageContainers = [];

            mutationList.forEach(mutation => {
                // Handle an existing element with data-pp-message added, or a brand new element with data-pp-message on it
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-pp-message') {
                    newMessageContainers.push(mutation.target);
                } else {
                    /**
                     * IE11 does not support nodeList.prototype.forEach().
                     * Use Array.prototype.slice.call() to turn nodeList into a regular array before using forEach().
                     */
                    Array.prototype.slice.call(mutation.addedNodes).forEach(node => {
                        if (isElement(node) && node.hasAttribute('data-pp-message')) {
                            newMessageContainers.push(node);
                        }
                    });
                }
            });

            newMessageContainers.forEach(container =>
                window[getNamespace()]?.Messages({ _auto: true }).render(container)
            );
        })
);

export const getAttributeObserver = createGlobalVariableGetter(
    '__attribute_observer__',
    () =>
        new MutationObserver(mutationList => {
            const { messagesMap } = getGlobalState();
            const containersToUpdate = mutationList.reduce((accumulator, mutation) => {
                if (!messagesMap.has(mutation.target) || !stringStartsWith(mutation.attributeName, 'data-pp-')) {
                    return accumulator;
                }

                accumulator.push(mutation.target);

                return accumulator;
            }, []);

            // Re-render each container without options because the render will scan for all inline attributes
            containersToUpdate.forEach(container => window[getNamespace()]?.Messages().render(container));
        })
);

export const getOverflowObserver = createGlobalVariableGetter('__intersection_observer__', () =>
    ZalgoPromise.resolve(
        // eslint-disable-next-line compat/compat
        typeof window.IntersectionObserver === 'undefined'
            ? dynamicImport('https://polyfill.io/v3/polyfill.js?features=IntersectionObserver')
            : undefined
    )
        .then(() =>
            ZalgoPromise.all([
                // Ensure window has loaded otherwise root can be miscalculated and default to null (viewport)
                // and cause messages below the fold to hide
                // e.g. https://www.escortradar.com/products/escort_redline_360c
                awaitWindowLoad,
                // Ensure a message has rendered so that the [data-pp-id] querySelector below is not null
                awaitFirstRender
            ])
        )
        .then(() => {
            const firstContainer = getGlobalState()
                .messagesMap.keys()
                .next().value;
            // A single page app could cause an issue here if the root element is
            // determined to be inside the main single page app code
            const root = getRoot(firstContainer);
            // eslint-disable-next-line compat/compat
            return new IntersectionObserver(
                (entries, observer) => {
                    const { messagesMap } = getGlobalState();

                    entries.forEach(entry => {
                        const iframe = entry.target;
                        const container = iframe.parentNode.parentNode;
                        // If the library has been cleaned up by an SDK destroy, the container
                        // may not exist in the current SDK script messageMap. In this scenario
                        // we will short circuit on the state.render check
                        const { state } = messagesMap.get(container) || {};

                        // Only run in the context of a render call, and NOT when resizing the
                        // element for other reasons such as window resizing
                        if (!state?.renderStart) {
                            observer.unobserve(iframe);
                            return;
                        }

                        const index = container.getAttribute('data-pp-id');
                        const minWidth = Number(iframe.getAttribute('data-width'));
                        const minHeight = Number(iframe.getAttribute('data-height'));
                        const duration = getCurrentTime() - state.renderStart;

                        let isIntersectingFallback;
                        // TODO: Further investigate why in some edge-cases the entry values are all 0.
                        // If this is the case we run our own calculations as a fallback.
                        // e.g. https://www.auto-protect-shop.de/nanolex-ultra-glasversiegelung-set/a-528
                        if (entry.rootBounds?.width === 0 && entry.rootBounds.height === 0) {
                            isIntersectingFallback = elementContains(root, entry.target);
                        }

                        /**
                         * Get the current coordinates of the message.
                         */
                        const { bottom, left, right, top } = iframe.getBoundingClientRect();

                        /**
                         * Check to see if the message is entirely offscreen by the top/right/bottom/left, and return
                         * if any are true.
                         * @returns boolean
                         */
                        const isOffScreen = () => {
                            return !!(
                                left >= window.innerWidth ||
                                right <= 0 ||
                                bottom <= 0 ||
                                top >= window.innerHeight
                            );
                        };

                        /**
                         * if the message's coordinates are entirely offscreen AND the message is a legitimate size,
                         * set an attribute on the message of 'data-pp-position' with the value set to 'offscreen'.
                         */
                        if (isOffScreen() && Math.ceil(entry.boundingClientRect.width) >= minWidth) {
                            container.setAttribute('data-pp-position', 'offscreen');
                        }

                        /**
                         * This function will try to fallback and failing that, hide the message.
                         */
                        const overflowDetection = () => {
                            if (container.getAttribute('data-pp-style-preset') === 'smallest') {
                                logger.warn(state.renderComplete ? 'update_hidden' : 'hidden', {
                                    description: `PayPal Message has been hidden. Fallback message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`,
                                    container,
                                    index,
                                    duration
                                });
                                logger.track({
                                    index,
                                    et: 'CLIENT_IMPRESSION',
                                    event_type: 'message_hidden'
                                });
                                state.renderComplete = true;
                                delete state.renderStart;
                            } else {
                                container.setAttribute('data-pp-style-preset', 'smallest');
                                logger.warn(state.renderComplete ? 'update_overflow' : 'overflow', {
                                    description: `PayPal Message attempting fallback. Message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`,
                                    container,
                                    index,
                                    duration
                                });
                            }

                            iframe.style.setProperty('opacity', '0', 'important');
                            iframe.style.setProperty('pointer-events', 'none', 'important');

                            observer.unobserve(iframe);
                        };

                        /**
                         * If the message is intersecting/partially obscured AND the message isn't offscreen,
                         * or the message is too small, run the overflowDetection function to hide the message.
                         *
                         * Else, ensure the message is visible.
                         */
                        if (
                            ((entry.intersectionRatio < 0.9 &&
                                container.getAttribute('data-pp-position') !== 'offscreen') ||
                                // Round up for decimal values
                                Math.ceil(entry.boundingClientRect.width) < minWidth) &&
                            !isIntersectingFallback
                        ) {
                            overflowDetection();
                        } else {
                            // Reset if previously hidden
                            iframe.style.setProperty('opacity', 1);
                            iframe.style.setProperty('pointer-events', null);

                            logger.info(state.renderComplete ? 'update_visible' : 'visible', {
                                index,
                                duration
                            });

                            state.renderComplete = true;

                            /**
                             * This function when run, will track the message for attribute changes.
                             * If the mutation type is for an attribute change, and the attribute is 'onscreen',
                             * add a new IntersectionObserver so we can see if the message is on screen and not
                             * intersecting with anything. If so, fire the slider-visible tracking event, if not
                             * then check to see if it's intersection with something and run the overflowDetection function
                             * to hide the message.
                             *
                             * Then unobserve the message to prevent IntersectionObserver from running every time we open/close
                             * a slider, so we prevent multiple logs.
                             */
                            const mutationTracking = () => {
                                const mut = new MutationObserver(mutations => {
                                    mutations.forEach(mutation => {
                                        if (
                                            mutation.type === 'attributes' &&
                                            mutation.target.getAttribute('data-pp-position') === 'onscreen'
                                        ) {
                                            new IntersectionObserver((affectedEntries, affectedObserver) => {
                                                affectedEntries.forEach(affectedEntry => {
                                                    if (affectedEntry.intersectionRatio === 1) {
                                                        /**
                                                         * Fire slider-visible event once slider with message inside comes into viewport.
                                                         * The slider-visible event corresponds to the "message_viewed" event name.
                                                         */
                                                        logger.track({
                                                            index,
                                                            et: 'CLIENT_IMPRESSION',
                                                            event_type: 'slider-visible',
                                                            visible: 'true'
                                                        });
                                                    } else if (
                                                        affectedEntry.intersectionRatio < 0.9 &&
                                                        affectedEntry.intersectionRatio > 0
                                                    ) {
                                                        overflowDetection();
                                                    }
                                                    affectedObserver.unobserve(affectedEntry.target);
                                                });
                                            }).observe(mutation.target);
                                        }
                                    });
                                });

                                mut.observe(container, { attributes: true });
                            };

                            /**
                             * If the coordinates of a message are within the viewport (i.e. a normal on-screen message, or a slider
                             * bringing one into view), add a timeout (to account for potential slider animation times) and check to see
                             * if the message contains the previously set attribute of "offscreen". This would be the case in messages
                             * that are contained within a slider. Because the message within a slider would have this "offscreen" property,
                             * we update the attribute value to "onscreen" as the message is now in the viewport.
                             *
                             * A normal message not within a slider would not have this attribute, so instead we skip the above attribute update
                             * and delete the state.renderStart and detach the IntersectionObserver.
                             */
                            if (!isOffScreen()) {
                                setTimeout(() => {
                                    if (container.getAttribute('data-pp-position') === 'offscreen') {
                                        mutationTracking();
                                        container.setAttribute('data-pp-position', 'onscreen');
                                    }
                                }, 550);
                                delete state.renderStart;

                                observer.unobserve(iframe);
                            }
                        }
                        /**
                         * If the message is offscreen (i.e. in a slider), we attach the IntersectionObserver to the message.
                         */
                        if (container.getAttribute('data-pp-position') === 'offscreen') observer.observe(iframe);
                    });
                },
                {
                    root
                }
            );
        })
);
