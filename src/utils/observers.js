import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import arrayFrom from 'core-js-pure/stable/array/from';

import { getGlobalState, createGlobalVariableGetter } from './global';
import { dynamicImport, getCurrentTime } from './miscellaneous';
import { awaitWindowLoad, awaitFirstRender } from './events';
import { logger } from './logger';
import { getNamespace, isScriptBeingDestroyed } from './sdk';
import { getRoot, elementContains, isElement, elementOutside } from './elements';
import { ppDebug } from './debug';

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
                    arrayFrom(mutation.addedNodes).forEach(node => {
                        if (isElement(node)) {
                            if (node.hasAttribute('data-pp-message')) {
                                newMessageContainers.push(node);
                            } else {
                                arrayFrom(node.querySelectorAll('[data-pp-message]')).forEach(targetedChildNode =>
                                    newMessageContainers.push(targetedChildNode)
                                );
                            }
                        }
                    });
                }
            });

            if (newMessageContainers.length > 0 && !isScriptBeingDestroyed()) {
                newMessageContainers.forEach(container =>
                    window[getNamespace()]?.Messages({ _auto: true }).render(container)
                );
            }
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

            if (containersToUpdate.length > 0 && !isScriptBeingDestroyed()) {
                // Re-render each container without options because the render will scan for all inline attributes
                containersToUpdate.forEach(container => window[getNamespace()]?.Messages().render(container));
            }
        })
);

export const getIntersectionObserverPolyfill = () => {
    return ZalgoPromise.resolve(
        // eslint-disable-next-line compat/compat
        typeof window.IntersectionObserver === 'undefined'
            ? dynamicImport('https://polyfill.io/v3/polyfill.js?features=IntersectionObserver')
            : undefined
    );
};

export const getViewportIntersectionObserver = createGlobalVariableGetter('__viewport_intersection_observer__', () =>
    getIntersectionObserverPolyfill().then(() => {
        // eslint-disable-next-line compat/compat
        return new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    const index = entry.target.getAttribute('data-pp-id');
                    if (entry.isIntersecting) {
                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'scroll',
                            visible: 'true'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );
    })
);

export const getOverflowObserver = createGlobalVariableGetter('__intersection_observer__', () =>
    getIntersectionObserverPolyfill()
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
            const firstContainer = getGlobalState().messagesMap.keys().next().value;
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
                        ppDebug('Message Container:', { debugObj: container });
                        ppDebug('Messages Container Parent:', { debugObj: container.parentNode });
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
                            isIntersectingFallback = elementContains(root, iframe);
                        }

                        /**
                         * If the message is intersecting/partially obscured AND the message isn't off the page,
                         * or the message is too small, run overflow detection to hide the message.
                         *
                         * Else, ensure the message is visible.
                         */
                        if (
                            ((entry.intersectionRatio < 0.9 &&
                                entry.intersectionRatio > 0 &&
                                !elementOutside(root ?? window, iframe)) ||
                                // Round up for decimal values
                                // Increment calculation +1 as a margin of error to account for fractional widths.
                                Math.ceil(iframe.getBoundingClientRect().width + 1) < minWidth) &&
                            !isIntersectingFallback
                        ) {
                            logger.warn(state.renderComplete ? 'update_hidden' : 'hidden', {
                                description: `PayPal Message has been hidden. Message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`,
                                container,
                                index,
                                duration
                            });
                            logger.track({
                                index,
                                et: 'CLIENT_IMPRESSION',
                                event_type: 'message_hidden'
                            });
                            ppDebug(`Message Hidden: true`);
                            state.renderComplete = true;
                            delete state.renderStart;

                            iframe.style.setProperty('opacity', '0', 'important');
                            iframe.style.setProperty('pointer-events', 'none', 'important');

                            observer.unobserve(iframe);
                        } else {
                            // Reset if previously hidden
                            iframe.style.setProperty('opacity', 1);
                            iframe.style.setProperty('pointer-events', null);

                            logger.info(state.renderComplete ? 'update_visible' : 'visible', {
                                index,
                                duration
                            });

                            state.renderComplete = true;
                            delete state.renderStart;

                            observer.unobserve(iframe);
                        }
                    });
                },
                {
                    root
                }
            );
        })
);
