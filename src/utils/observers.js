import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { globalState, getGlobalVariable } from './global';
import { objectMerge, flattenedToObject } from './objects';
import { dynamicImport, getCurrentTime, DOMContentLoaded } from './miscellaneous';
import { logger } from './logger';

export const attributeObserver = getGlobalVariable(
    '__attribute_observer__',
    () =>
        new MutationObserver(mutationList => {
            const { messagesMap } = globalState;
            const messagesToUpdate = mutationList.reduce((accumulator, mutation) => {
                if (!messagesMap.has(mutation.target) || !stringStartsWith(mutation.attributeName, 'data-pp-')) {
                    return accumulator;
                }

                const newOption = flattenedToObject(
                    mutation.attributeName.slice(8),
                    mutation.target.getAttribute(mutation.attributeName)
                );

                accumulator.set(
                    mutation.target,
                    accumulator.has(mutation.target)
                        ? objectMerge(accumulator.get(mutation.target), newOption)
                        : newOption
                );

                return accumulator;
            }, new Map());

            messagesToUpdate.forEach((newMerchantOptions, container) =>
                messagesMap.get(container).updateProps(newMerchantOptions)
            );
        })
);

const getRoot = () => {
    const { innerWidth, innerHeight } = window;
    const elementsFromPoint = (typeof document.elementsFromPoint === 'function'
        ? document.elementsFromPoint
        : document.msElementsFromPoint
    ).bind(document);

    const root = arrayFind(
        arrayFrom(elementsFromPoint(innerWidth / 2, innerHeight / 2)).reverse(),
        el => window.getComputedStyle(el).height !== `${innerHeight}px`
    );

    return root;
};

export const overflowObserver = getGlobalVariable('__intersection_observer__', () =>
    ZalgoPromise.resolve(
        typeof window.IntersectionObserver === 'undefined'
            ? dynamicImport('https://polyfill.io/v3/polyfill.js?features=IntersectionObserver')
            : undefined
    )
        .then(() => DOMContentLoaded)
        .then(() => {
            // Ensure DOM has loaded otherwise root will default to null (viewport)
            // and cause messages below the fold to hide
            // e.g. https://www.escortradar.com/products/escort_redline_360c
            const root = getRoot();
            // eslint-disable-next-line compat/compat
            return new IntersectionObserver(
                (entries, observer) => {
                    const { messagesMap } = globalState;

                    entries.forEach(entry => {
                        const iframe = entry.target;
                        const container = iframe.parentNode.parentNode;
                        const { state } = messagesMap.get(container);

                        // Only run in the context of a render call, and NOT when resizing the
                        // element for other reasons such as window resizing
                        if (!state.renderStart) {
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
                        if (entry.rootBounds.width === 0 && entry.rootBounds.height === 0) {
                            const rootBounds = root.getBoundingClientRect();
                            const boundingClientRect = entry.target.getBoundingClientRect();

                            isIntersectingFallback =
                                rootBounds.top <= boundingClientRect.top &&
                                rootBounds.bottom >= boundingClientRect.bottom &&
                                rootBounds.left <= boundingClientRect.left &&
                                rootBounds.right >= boundingClientRect.right;
                        }

                        if (
                            (entry.intersectionRatio < 0.9 || entry.boundingClientRect.width < minWidth) &&
                            !isIntersectingFallback
                        ) {
                            if (container.getAttribute('data-pp-style-preset') === 'smallest') {
                                iframe.style.setProperty('opacity', '0', 'important');
                                iframe.style.setProperty('pointer-events', 'none', 'important');
                                logger.warn(state.renderComplete ? 'update_hidden' : 'hidden', {
                                    description: `PayPal Message has been hidden. Fallback message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`,
                                    container,
                                    index,
                                    duration
                                });
                                state.renderComplete = true;
                                delete state.renderStart;
                            } else {
                                iframe.style.setProperty('opacity', '0', 'important');
                                iframe.style.setProperty('pointer-events', 'none', 'important');
                                container.setAttribute('data-pp-style-preset', 'smallest');
                                logger.warn(state.renderComplete ? 'update_overflow' : 'overflow', {
                                    description: `PayPal Message attempting fallback. Message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`,
                                    container,
                                    index,
                                    duration
                                });
                            }

                            observer.unobserve(iframe);
                        } else {
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
