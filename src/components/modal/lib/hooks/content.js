import arrayFind from 'core-js-pure/stable/array/find';
import { useMemo } from 'preact/hooks';
import { useServerData } from '../../../lib/providers';
import { objectGet } from '../../../../utils';

function replaceVariables(content, data) {
    switch (typeof content) {
        case 'string':
            return content.replace(/{\s*?([^\s]+?)\s*?}/g, (_, templateVariable) => {
                return objectGet(data, templateVariable) ?? '';
            });
        case 'object':
            if (Array.isArray(content)) {
                return content.map(line => replaceVariables(line, data));
            }

            return Object.keys(content).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: replaceVariables(content[key], data)
                }),
                {}
            );
        default:
            return '';
    }
}

export function useProduct(product) {
    const { products, terms, offer, aprEntry } = useServerData();
    const variablesReplaced = useMemo(
        () =>
            replaceVariables(products, {
                terms,
                offer,
                aprEntry,
                fullYear: new Date().getFullYear()
            }),
        [products, terms, offer, aprEntry]
    );

    return arrayFind(variablesReplaced, ({ meta }) => meta.product === product) ?? { content: {} };
}

export function useContent(product) {
    const { content } = useProduct(product);
    return content;
}

export function useProductMeta(product) {
    const { meta } = useProduct(product);
    return meta;
}
