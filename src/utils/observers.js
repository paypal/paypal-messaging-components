import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import objectValues from 'core-js-pure/stable/object/values';

import { globalState } from './global';
import { objectMerge, flattenedToObject } from './objects';

export const attributeObserver = new MutationObserver(mutationList => {
    const { messagesMap } = globalState;
    const messagesToUpdate = mutationList.reduce((accumulator, mutation) => {
        if (!messagesMap.has(mutation.target) || !stringStartsWith(mutation.attributeName, 'data-pp-')) {
            return accumulator;
        }

        const id = mutation.target.getAttribute('data-pp-id');

        return {
            [id]: objectMerge(
                accumulator[id] || { container: mutation.target },
                flattenedToObject(mutation.attributeName.slice(8), mutation.target.getAttribute(mutation.attributeName))
            )
        };
    }, {});

    objectValues(messagesToUpdate).forEach(({ container, ...newMerchantOptions }) =>
        messagesMap.get(container).updateProps(newMerchantOptions)
    );
});
