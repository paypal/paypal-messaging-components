/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import PI30 from './Pi30';
import GPL from './GPL';
import ProductList from './ProductList';
import { useServerData, useXProps, useTransitionState, useDidUpdateEffect } from '../../../lib';
import { getStandardProductOffer } from '../../../../../utils';
import { OFFER } from '../../../../../utils/constants';

const Content = () => {
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const product = getStandardProductOffer(offer);
    // Product List should be displayed when no amount and GPL + PI30 are available.
    const productNames = products.map(theProduct =>
        getStandardProductOffer(theProduct.meta.product, theProduct.meta.offerCountry)
    );

    // calculate what the inital product should be
    // will change based on offer and products avaliable
    // using available products offer country to correct PAY_LATER_SHORT_TERM to PAY_LATER_LONG_TERM for finding initial product
    const initialProduct =
        (productNames.includes('GPL') && productNames.includes('PI30')) ||
        (productNames.includes(OFFER.PAY_LATER_LONG_TERM) &&
            productNames.includes(OFFER.PAY_LATER_PAY_IN_1) &&
            (typeof amount === 'undefined' || amount === 0))
            ? 'none'
            : arrayFind(
                  products,
                  theProduct =>
                      getStandardProductOffer(theProduct.meta.product, theProduct.meta.offerCountry) ===
                      getStandardProductOffer(product, theProduct.meta.offerCountry)
              ) || getStandardProductOffer(products[0].meta.product, products[0].meta.offerCountry);
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
            case OFFER.PAY_LATER_LONG_TERM:
                return <GPL linkClick={linkClick} />;
            case OFFER.PAY_LATER_PAY_IN_1:
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
