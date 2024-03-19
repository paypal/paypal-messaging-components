import arrayFind from 'core-js-pure/stable/array/find';
import { useServerData } from '../providers';

export function useProduct(product) {
    const { products } = useServerData();
    return arrayFind(products, ({ meta }) => meta.product === product) ?? { content: {} };
}

export function useContent(product) {
    const { content } = useProduct(product);
    return content;
}

export function useProductMeta(product) {
    const { meta } = useProduct(product);
    return meta;
}
