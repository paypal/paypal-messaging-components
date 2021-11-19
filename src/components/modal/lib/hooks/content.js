import arrayFind from 'core-js-pure/stable/array/find';
import { useServerData } from '../providers';
import { getProductForOffer } from '../../../../utils';

export function useProduct(product) {
    const { products } = useServerData();

    return (
        arrayFind(products, ({ meta }) => {
            // temporary, remove once offers are updated in PStudio
            const metaProduct = getProductForOffer(meta.product);
            return metaProduct === product;
        }) ?? { content: {} }
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
