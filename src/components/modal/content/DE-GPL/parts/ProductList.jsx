/** @jsx h */
import { h, Fragment } from 'preact';
import { useContent, useServerData } from '../../../lib';

import Header from '../../../parts/Header';
import Icon from '../../../parts/Icon';

const ProductButton = ({ product, buttonClick }) => {
    const { productButton } = useContent(product);
    const { title, subtitle, icon } = productButton;
    return (
        <button type="button" className="product-button" id={`${product}-button`} onClick={() => buttonClick(product)}>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <Icon className="icon" name={icon} />
        </button>
    );
};

const ProductList = ({ buttonClick }) => {
    const { products } = useServerData();
    const productButtons = products
        // This filter is for when GPL and INST sometimes coexist in stage, despite that they should not in prod.
        .filter(product => product.meta.product !== 'INST')
        .map(product => <ProductButton buttonClick={buttonClick} product={product.meta.product} />);

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1>Jetzt kaufen, später bezahlen</h1>
                <h3>
                    Wählen Sie <b>PayPal</b>, um &quot;<b>Später Bezahlen</b>&quot; zu nutzen.
                </h3>
            </Header>
            <section className="content-body product-list">
                <div className="product-buttons content-column"> {productButtons}</div>
                <div className="legal disclosure content-column">
                    Es gelten die Nutzungsbedingungen. Vorbehaltlich Kreditwürdigkeitsprüfung. Für weitere Informationen
                    zur Bezahlung nach 30 Tagen oder PayPal Ratenzahlung wählen Sie eine der obigen Optionen.
                </div>
            </section>
        </Fragment>
    );
};

export default ProductList;
