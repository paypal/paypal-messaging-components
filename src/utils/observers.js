import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { getGlobalState, createGlobalVariableGetter } from './global';
import { dynamicImport, getCurrentTime } from './miscellaneous';
import { awaitWindowLoad, awaitFirstRender } from './events';
import { logger } from './logger';
import { getNamespace, isScriptBeingDestroyed } from './sdk';
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

                        if (
                            (entry.intersectionRatio < 0.9 ||
                                // Round up for decimal values
                                Math.ceil(entry.boundingClientRect.width) < minWidth) &&
                            !isIntersectingFallback
                        ) {
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
