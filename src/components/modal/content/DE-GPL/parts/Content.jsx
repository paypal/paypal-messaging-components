/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import PI30 from './Pi30';
import GPL from './GPL';
import ProductList from './ProductList';
import { useServerData, useXProps, useTransitionState, useDidUpdateEffect } from '../../../lib';
import { getStandardProductOffer } from '../../../../../utils';

const Content = () => {
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const product = getStandardProductOffer(offer);
    const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    // Product List should be displayed when no amount and GPL + PI30 are available.
    const productNames = products.map(theProduct => theProduct.meta.product);
    const [selectedProduct, selectProduct] = useState(
        productNames.includes('GPL') && productNames.includes('PI30') && (typeof amount === 'undefined' || amount === 0)
            ? 'none'
            : initialProduct.meta.product
    );
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
        const fullProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
        selectProduct(fullProduct.meta.product);
    }, [product]);

    useDidUpdateEffect(() => {
        if (transitionState === 'CLOSED') {
            if (
                productNames.includes('GPL') &&
                productNames.includes('PI30') &&
                (typeof amount === 'undefined' || amount === 0)
            ) {
                selectProduct('none');
            } else {
                selectProduct(initialProduct.meta.product);
            }
        }
    }, [transitionState]);

    const classNames = ['content'];

    function selectContent() {
        switch (selectedProduct) {
            case 'GPL':
                return <GPL linkClick={linkClick} />;
            case 'PI30':
                return <PI30 linkClick={linkClick} />;
            default:
                return <ProductList buttonClick={buttonClick} />;
        }
    }

    const content = selectContent();

    return (
        <Fragment>
            <div className={classNames.join(' ')}>
                <main className="main">{content}</main>
            </div>
        </Fragment>
    );
};

export default Content;
