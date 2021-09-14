/** @jsx h */
import { h, Fragment } from 'preact';
import { useContent, useServerData } from '../../../lib';

import Header from '../../../parts/Header';
import Icon from '../../../parts/Icon';

const ProductButton = ({ product, buttonClick }) => {
    const { productButton } = useContent(product);
    const { title, subtitle, icon } = productButton;
    return (
        <button type="button" className="product-button" onClick={() => buttonClick(product)}>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <Icon className="icon" name={icon} />
        </button>
    );
};

const ProductList = ({ buttonClick, cornerRef }) => {
    const { products } = useServerData();
    const productButtons = products.map(product => (
        <ProductButton buttonClick={buttonClick} product={product.meta.product} />
    ));

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
                <div className="product-buttons"> {productButtons}</div>
                <div className="legal disclosure">
                    Es gelten die Nutzungsbedingungen. Vorbehaltlich Kreditwürdigkeitsprüfung. Für weitere Informationen
                    zur <b>Bezahlung nach 30 Tagen</b> oder <b>PayPal Ratenzahlung</b> wählen Sie eine der obigen
                    Optionen.
                </div>
                {/* <div className="content-column product-buttons"> {productButtons}</div>
                <div className="content-column legal disclosure">
                    Es gelten die Nutzungsbedingungen. Vorbehaltlich Kreditwürdigkeitsprüfung. Für weitere Informationen
                    zur <b>Bezahlung nach 30 Tagen</b> oder <b>PayPal Ratenzahlung</b> wählen Sie eine der obigen
                    Optionen.
                </div> */}
            </section>
        </Fragment>
    );
};

export default ProductList;
