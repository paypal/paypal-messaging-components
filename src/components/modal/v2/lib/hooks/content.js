import { useServerData } from '../providers';

/**
 * Retrieves product data from server views by product identifier.
 * Returns a fallback object with empty content if views is not an array or product is not found.
 *
 * @param {string} product - The product identifier to find
 * @returns {Object} Product object containing meta and content
 */
export function useProduct(product) {
    const fallback = { content: {} };
    const { views } = useServerData();

    if (!Array.isArray(views)) {
        return fallback;
    }
    const view = views.find(({ meta }) => meta.product === product);

    return view ?? fallback;
}

export function useContent(product) {
    const { content } = useProduct(product);
    return content;
}

export function useProductMeta(product) {
    const { meta } = useProduct(product);
    return meta;
}
