/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import PI30 from './Pi30';
import GPL from './GPL';
import ProductList from './ProductList';
import { useServerData, useXProps, useDidUpdateEffect, useTransitionState } from '../../../lib';
import { getProductForOffer } from '../../../../../utils';

const Content = () => {
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const product = getProductForOffer(offer);
    const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    const [selectedProduct, selectProduct] = useState(initialProduct.meta.product);

    // Tracking for Product List clicks (button clicks) and for buttons that appear as links
    const buttonClick = theProduct => {
        onClick({ linkName: theProduct, src: 'button_click' });
        selectProduct(theProduct);
    };

    const linkClick = theProduct => {
        onClick({ linkName: theProduct, src: 'link_click' });
        selectProduct(theProduct);
    };

    useDidUpdateEffect(() => {
        // For standalone modal the product determined by the offer changing may be invalid
        // so we need to search against the actual offers and provide a default
        const fullProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];

        selectProduct(fullProduct.meta.product);
    }, [product]);

    useEffect(() => {
        // Product List should be displayed when no amount and GPL + PI30 are available.
        const productNames = products.map(theProduct => theProduct.meta.product);
        if (productNames.includes('GPL') && productNames.includes('PI30')) {
            if (typeof amount === 'undefined' || amount === 0) {
                selectProduct('none');
            }
        }
        if (transitionState === 'CLOSED') {
            selectProduct(initialProduct.meta.product);
        }
    }, [transitionState]);

    const classNames = ['content'];

    function modalContent() {
        switch (selectedProduct) {
            case 'GPL':
                return <GPL linkClick={linkClick} />;
            case 'PI30':
                return <PI30 linkClick={linkClick} />;
            default:
                return <ProductList buttonClick={buttonClick} />;
        }
    }

    return (
        <Fragment>
            <div className={classNames.join(' ')}>
                <main className="main">{modalContent()}</main>
            </div>
        </Fragment>
    );
};

export default Content;
