/** @jsx h */
import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import NI from './NI';
import GPL from './GPL';
import Tabs from '../../../parts/Tabs';
import {
    useServerData,
    useScroll,
    useApplyNow,
    useXProps,
    useDidUpdateEffect,
    getProductForOffer,
    useTransitionState
} from '../../../lib';
import Button from '../../../parts/Button';

const Content = ({ headerRef }) => {
    const cornerRef = useRef();
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const { scrollTo } = useScroll();
    const [sticky, setSticky] = useState(false);
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [showApplyNow, setApplyNow] = useState(false);
    // Offer may be undefined when modal is rendered via standalone modal integration
    const product = getProductForOffer(offer);
    // Product can be NONE when standalone modal so default to first product
    const initialProduct = arrayFind(products, prod => prod.meta.product === product) || products[0];
    const [selectedProduct, setSelectedProduct] = useState(initialProduct.meta.product);

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
        },
        [sticky]
    );

    const selectProduct = newProduct => {
        scrollTo(0);

        if (newProduct !== 'NI') {
            setApplyNow(false);
        }

        setSelectedProduct(newProduct);
    };

    const switchTab = newProduct => {
        onClick({ linkName: newProduct });
        selectProduct(newProduct);
    };

    useDidUpdateEffect(() => {
        setSelectedProduct(product);
    }, [product]);

    const setShowApplyNow = show => {
        if (selectedProduct === 'NI' && show !== showApplyNow) {
            setApplyNow(show);
        }
    };

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setShowApplyNow(false);
            setSticky(false);
        }
    }, [transitionState]);

    const tabsMap = {
        GPL: {
            title: 'Pay in 4',
            product: 'GPL'
        },
        NI: {
            title: 'PayPal Credit',
            product: 'NI'
        }
    };

    const tabs = products
        .map(({ meta }) => tabsMap[meta.product])
        // Filter to only the visible tab if no amount is passed in
        .filter(tab => typeof amount === 'undefined' || amount === 0 || tab.product === selectedProduct);

    const showTabSwitch = tabs.length === 1 && products.length > 1;
    // Add the body of the tabs later to be able to reference the callbacks which reference the tabsMap
    tabsMap.GPL.body = <GPL switchTab={showTabSwitch ? () => switchTab('NI') : null} />;

    tabsMap.NI.body = <NI showApplyNow={setShowApplyNow} switchTab={showTabSwitch ? () => switchTab('GPL') : null} />;

    const tabsContent =
        tabs.length > 1 ? (
            <Tabs tabs={tabs} onSelect={index => selectProduct(tabs[index].product)} />
        ) : (
            <div className="tab-transition-item selected">{tabs[0].body}</div>
        );

    const classNames = ['content', sticky ? 'sticky' : ''];

    return (
        <div className={classNames.join(' ')}>
            <span className="corner" ref={cornerRef} />
            <div className={`sticky-apply-now ${showApplyNow ? 'show' : ''}`}>
                <Button onClick={handleApplyNowClick} className="apply-now">
                    Apply for PayPal Credit
                </Button>
                <div>Subject to credit approval.</div>
                <hr className="divider" />
            </div>
            <main className="main">{tabsContent}</main>
        </div>
    );
};

export default Content;
