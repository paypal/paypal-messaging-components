/** @jsx h */
import { h } from 'preact';

import { useServerData, useContent, useProductMeta } from '../../../lib';
import Calculator from './Calculator';

export default () => {
    const { products } = useServerData();
    const { instructions, disclosure } = useContent('GPL');
    const { apr } = useProductMeta('GPL');
    // Offer may be undefined when modal is rendered via standalone modal integration
    // const product = getProductForOffer(offer);
    // Product can be NONE when standalone modal so default to first product
    // const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    // const [selectedProduct, setSelectedProduct] = useState(initialProduct.meta.product);

    const altProduct = products.length > 1 && <p>For another option, see Pay in 30 days.</p>;

    return (
        <section className="content-body">
            <Calculator />

            <div className="content-column instructions transitional">
                {instructions.map(instruction =>
                    instruction === 'PayPal' ? <b>PayPal </b> : <span>{instruction} </span>
                )}
            </div>

            <div>{altProduct}</div>

            <div className="content-column disclosure transitional">
                {(apr === '0.00' ? disclosure.zeroAPR : disclosure.nonZeroAPR).replace(/,00/g, '')}
            </div>
        </section>
    );
};
