import { useServerData } from '../providers';

export function useProduct(product) {
    const { views } = useServerData();

    return views.find(({ meta }) => meta.product === product) ?? { content: {} };
}

export function useContent(product) {
    const { content } = useProduct(product);
    return content;
}

export function useProductMeta(product) {
    const { meta } = useProduct(product);
    return meta;
}
