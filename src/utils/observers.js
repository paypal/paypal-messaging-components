import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
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
                        const iframe = entry.target;
                        const container = iframe.parentNode.parentNode;
                        const minWidth = Number(iframe.getAttribute('data-width'));
                        const minHeight = Number(iframe.getAttribute('data-height'));

                        if (entry.intersectionRatio < 0.9 || entry.boundingClientRect.width < minWidth) {
                            if (container.getAttribute('data-pp-style-preset') === 'smallest') {
                                iframe.style.setProperty('opacity', '0', 'important');
                                console.warn(
                                    `[PayPal Messages]  PayPal Message has been hidden. Fallback message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`
                                );
                            } else {
                                iframe.style.setProperty('opacity', '0', 'important');
                                container.setAttribute('data-pp-style-preset', 'smallest');
                                console.warn(
                                    `[PayPal Messages]  PayPal Message attempting fallback. Message must be visible and requires minimum dimensions of ${minWidth}px x ${minHeight}px. Current container is ${entry.intersectionRect.width}px x ${entry.intersectionRect.height}px.`
                                );
                            }
                        }

                        observer.unobserve(iframe);
                    });
                },
                {
                    root: getRoot()
                }
            )
    )
);
