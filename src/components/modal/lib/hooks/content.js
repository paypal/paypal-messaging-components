import arrayFind from 'core-js-pure/stable/array/find';
import { useServerData } from '../providers';
import { getStandardProductOffer } from '../../../../utils/miscellaneous';

export function useProduct(product) {
    const { products } = useServerData();
    return (
        arrayFind(
            products,
            ({ meta }) => getStandardProductOffer(meta.product, meta.offerCountry) === getStandardProductOffer(product)
        ) ?? { content: {} }
    );
}

export function useContent(product) {
    const { content } = useProduct(product);
    return content;
}

export function useProductMeta(product) {
    const { meta } = useProduct(product);
    return meta;
}
