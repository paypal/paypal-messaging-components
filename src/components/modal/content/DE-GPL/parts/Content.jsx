/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import PI30 from './Pi30';
import GPL from './GPL';
import ProductList from './ProductList';
import { useServerData, useScroll, useXProps, useDidUpdateEffect, useTransitionState } from '../../../lib';
import { getProductForOffer } from '../../../../../utils';

const Content = ({ contentWrapper }) => {
    const cornerRef = useRef();
    const headerRef = useRef();
    const { products } = useServerData();
    const { offer, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const { scrollTo } = useScroll();
    const [sticky, setSticky] = useState(false);
    // scrollY stores the modal scroll position.
    const scrollY = useRef(0);
    // Offer may be undefined when modal is rendered via standalone modal integration
    const product = getProductForOffer(offer);
    // Product can be NONE when standalone modal so default to first product
    const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    const [selectedProduct, setSelectedProduct] = useState('none');
    useScroll(
        ({ target: { scrollTop } }) => {
            const { clientHeight: headerHeight } = headerRef.current;
            const { clientHeight: cornerHeight } = cornerRef.current;

            // event.target.scrollTop resets itself to 0 under certain circumstances as the user scrolls on mobile
            // Checking the value here prevents erratic behavior wrt
            if (scrollTop !== 0) {
                if (scrollTop >= headerHeight + cornerHeight) {
                    if (!sticky) {
                        setSticky(true);
                    }
                } else if (sticky) {
                    setSticky(false);
                }
            }
            /**
             * As you scroll, scrollY.current ref will be set to the value of scrollTop.
             * The scrollTop value is the distance between the top of the contentWrapper element and the top of the scrollable space within the modal.
             */
            scrollY.current = scrollTop;
        },
        [sticky]
    );

    const selectProduct = newProduct => {
        scrollTo(0);

        setSelectedProduct(newProduct);
        /**
         * For multiproduct modal:
         * If the sticky header is set, when you click to switch tabs, go to the uppermost sticky position.
         * Modal content will start at the top upon switching tabs.
         */
        if (sticky) {
            contentWrapper.current.scrollTo(0, headerRef.current.clientHeight + cornerRef.current.clientHeight);
            // Otherwise, when you switch tabs, the modal will stay scrolled to the position you were at when you clicked the tab button.
        } else {
            contentWrapper.current.scrollTo(0, scrollY.current);
        }
    };

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

        setSelectedProduct(fullProduct.meta.product);
    }, [product]);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setSticky(false);
            setSelectedProduct('none');
        }
    }, [transitionState]);

    const classNames = ['content', sticky ? 'sticky' : ''];

    function modalContent() {
        const productNames = products.map(theProduct => theProduct.meta.product);
        if (!(productNames.includes('GPL') && productNames.includes('PI30'))) {
            setSelectedProduct(initialProduct.meta.product);
        }

        switch (selectedProduct) {
            case 'GPL':
                return <GPL linkClick={linkClick} cornerRef={cornerRef} />;
            case 'PI30':
                return <PI30 linkClick={linkClick} cornerRef={cornerRef} />;
            case 'none':
            default:
                return <ProductList buttonClick={buttonClick} cornerRef={cornerRef} />;
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
