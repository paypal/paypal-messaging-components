import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import objectValues from 'core-js-pure/stable/object/values';
import { ZalgoPromise } from 'zalgo-promise';

import { globalState, getGlobalVariable } from './global';
import { objectMerge, flattenedToObject } from './objects';
import { dynamicImport } from './miscellaneous';

export const attributeObserver = getGlobalVariable(
    '__attribute_observer__',
    () =>
        new MutationObserver(mutationList => {
            const { messagesMap } = globalState;
            const messagesToUpdate = mutationList.reduce((accumulator, mutation) => {
                if (!messagesMap.has(mutation.target) || !stringStartsWith(mutation.attributeName, 'data-pp-')) {
                    return accumulator;
                }

                const id = mutation.target.getAttribute('data-pp-id');

                return {
                    [id]: objectMerge(
                        accumulator[id] || { container: mutation.target },
                        flattenedToObject(
                            mutation.attributeName.slice(8),
                            mutation.target.getAttribute(mutation.attributeName)
                        )
                    )
                };
            }, {});

            objectValues(messagesToUpdate).forEach(({ container, ...newMerchantOptions }) =>
                messagesMap.get(container).updateProps(newMerchantOptions)
            );
        })
);

const getRoot = () => {
    const { innerWidth, innerHeight } = window;

    return arrayFind(
        arrayFrom(document.elementsFromPoint(innerWidth / 2, innerHeight / 2)).reverse(),
        el => window.getComputedStyle(el).height !== `${innerHeight}px`
    );
};

export const overflowObserver = getGlobalVariable('__intersection_observer__', () =>
    ZalgoPromise.resolve(
        typeof window.IntersectionObserver === 'undefined'
            ? dynamicImport('https://polyfill.io/v3/polyfill.js?features=IntersectionObserver')
            : undefined
    ).then(
        () =>
            // eslint-disable-next-line compat/compat
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        const minWidth = Number(entry.target.getAttribute('data-width'));
                        const minHeight = Number(entry.target.getAttribute('data-height'));

                        if (entry.intersectionRatio < 0.9 || entry.boundingClientRect.width < minWidth) {
                            // if (arrayEvery(objectEntries(minSizeOptions), ([key, val]) => objectGet(options, key) === val)) {
                            entry.target.style.setProperty('display', 'none');
                            console.warn(
                                `[PayPal Messages] PayPal Credit Message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px. Message has been hidden.`
                            );
                            // } else {
                            //     // Highest priority styles, will re-render from attribute observer
                            //     objectEntries(minSizeOptions).forEach(([key, val]) => {
                            //         const attributeKey = `data-pp-${key.replace(/\./g, '-')}`;
                            //         wrapper.parentNode.setAttribute(attributeKey, val);
                            //     });
                            // }
                        }

                        observer.unobserve(entry.target);
                    });
                },
                {
                    root: getRoot()
                }
            )
    )
);
