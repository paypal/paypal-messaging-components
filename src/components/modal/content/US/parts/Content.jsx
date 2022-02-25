/** @jsx h */
import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import arrayFind from 'core-js-pure/stable/array/find';

import NI from './NI';
import GPL from './GPL';
import Tabs from '../../../parts/Tabs';
import { useServerData, useScroll, useApplyNow, useXProps, useDidUpdateEffect, useTransitionState } from '../../../lib';
import { getStandardProductOffer } from '../../../../../utils';
import Button from '../../../parts/Button';

const Content = ({ headerRef, contentWrapper }) => {
    const cornerRef = useRef();
    const { products } = useServerData();
    const { offer, amount, onClick } = useXProps();
    const [transitionState] = useTransitionState();
    const { scrollTo } = useScroll();
    const [sticky, setSticky] = useState(false);
    // scrollY stores the modal scroll position.
    const scrollY = useRef(0);
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [showApplyNow, setApplyNow] = useState(false);
    // Offer may be undefined when modal is rendered via standalone modal integration
    // Product can be NONE when standalone modal so default to first product
    const initialProduct =
        arrayFind(products, prod => getStandardProductOffer(prod.meta.product) === offer) || products[0];
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

        if (newProduct !== 'NI') {
            setApplyNow(false);
        }

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

    // Tabs component will track tab switches by default
    // for "fake" tabs that show as links, we must track it manually
    const tabLinkClick = newProduct => {
        onClick({ linkName: newProduct, src: 'link_click' });
        selectProduct(newProduct);
        document.querySelector('#close-btn').focus();
    };

    useDidUpdateEffect(() => {
        // For standalone modal the product determined by the offer changing may be invalid
        // so we need to search against the actual offers and provide a default
        const fullProduct =
            arrayFind(products, prod => getStandardProductOffer(prod.meta.product) === offer) || products[0];

        setSelectedProduct(fullProduct.meta.product);
    }, [offer]);

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
    tabsMap.GPL.body = <GPL switchTab={showTabSwitch ? () => tabLinkClick('NI') : null} />;

    tabsMap.NI.body = (
        <NI showApplyNow={setShowApplyNow} switchTab={showTabSwitch ? () => tabLinkClick('GPL') : null} />
    );

    const tabsContent =
        tabs.length > 1 ? (
            <Tabs
                tabs={tabs}
                onSelect={index => {
                    selectProduct(tabs[index].product);
                }}
            />
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
