/** @jsx h */
import { h, Fragment } from 'preact';
import { useContent, useServerData } from '../../../lib';

import Header from '../../../parts/Header';
import Icon from '../../../parts/Icon';

const ProductButton = ({ product, selectProduct }) => {
    const { productButton } = useContent(product);
    const { title, subtitle, icon } = productButton;
    return (
        <button type="button" className="product-button" onClick={() => selectProduct(product)}>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <Icon className="icon" name={icon} />
        </button>
    );
};

const ProductList = ({ selectProduct, cornerRef }) => {
    const { products: productObjects } = useServerData();
    const products = productObjects.map(object => object.meta.product);

    const productButtons = products.map(product => <ProductButton selectProduct={selectProduct} product={product} />);

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1>Jetzt kaufen, später bezahlen</h1>
                <h2>
                    Wählen Sie <b>PayPal</b>, um <b>´Später Bezahlen´</b> zu nutzen.
                </h2>
            </Header>
            <span className="corner" ref={cornerRef} />
            <section className="content-body product-list">
                <div className="content-column product-buttons"> {productButtons}</div>
                <div className="content-column legal disclosure">Legal Content</div>
            </section>
        </Fragment>
    );
};

export default ProductList;
