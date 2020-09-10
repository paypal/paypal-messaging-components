import arrayFind from 'core-js-pure/stable/array/find';
import { useServerData } from '../providers';

export default function useContent(product) {
    const { products } = useServerData();

    return arrayFind(products, ({ meta }) => meta.product === product) ?? { content: {} };
}
