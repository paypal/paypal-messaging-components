/** @jsx h */
import { h } from 'preact';
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
    // Product List should be displayed when no amount and GPL + PI30 are available.
    const productNames = products.map(theProduct => theProduct.meta.product);

    // calculate what the inital product should be
    // will change based on offer and products avaliable
    const initialProduct =
        productNames.includes('GPL') && productNames.includes('PI30') && (typeof amount === 'undefined' || amount === 0)
            ? 'none'
            : (
                  arrayFind(products, theProduct => getStandardProductOffer(theProduct.meta.product) === product) ||
                  products[0]
              ).meta.product;

    const [selectedProduct, selectProduct] = useState(initialProduct);

    // Tracking for Product List clicks (button clicks) and for buttons that appear as links
    const buttonClick = theProduct => {
        onClick({ linkName: theProduct, src: 'button_click' });
        selectProduct(theProduct);
    };

    const linkClick = theProduct => {
        onClick({ linkName: theProduct, src: 'link_click' });
        selectProduct(theProduct);
    };

    // if the inital product changes lets re-calculate what the inital product was
    useDidUpdateEffect(() => {
        selectProduct(initialProduct);
    }, [initialProduct]);

    useDidUpdateEffect(() => {
        // on close go back to the original product
        if (transitionState === 'CLOSED') {
            selectProduct(initialProduct);
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
        <div className={classNames.join(' ')}>
            <main className="main">{content}</main>
        </div>
    );
};

export default Content;
