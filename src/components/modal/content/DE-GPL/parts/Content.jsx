/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import PI30 from './Pi30';
import GPL from './GPL';
import ProductList from './ProductList';
import { useServerData, useXProps, useTransitionState } from '../../../lib';
import { getProductForOffer } from '../../../../../utils';

const Content = () => {
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const product = getProductForOffer(offer);
    const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    const [selectedProduct, selectProduct] = useState(initialProduct.meta.product);
    // Product List should be displayed when no amount and GPL + PI30 are available.
    const productNames = products.map(theProduct => theProduct.meta.product);
    // Tracking for Product List clicks (button clicks) and for buttons that appear as links
    const buttonClick = theProduct => {
        onClick({ linkName: theProduct, src: 'button_click' });
        selectProduct(theProduct);
    };

    const linkClick = theProduct => {
        onClick({ linkName: theProduct, src: 'link_click' });
        selectProduct(theProduct);
    };

    useEffect(() => {
        const fullProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
        selectProduct(fullProduct.meta.product);
        if (productNames.includes('GPL') && productNames.includes('PI30')) {
            if (typeof amount === 'undefined' || amount === 0) {
                selectProduct('none');
            }
        }
        if (transitionState === 'CLOSED') {
            selectProduct(initialProduct.meta.product);
        }
    }, [transitionState, product]);

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
