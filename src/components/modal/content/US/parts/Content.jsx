/** @jsx h */
import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import arrayEvery from 'core-js-pure/stable/array/every';
import arrayFind from 'core-js-pure/stable/array/find';

import NI from './NI';
import GPL from './GPL';
import Tabs from '../../../parts/Tabs';
import { useServerData, useScroll, useApplyNow, useXProps } from '../../../lib';
import Button from '../../../parts/Button';

const Content = ({ headerRef }) => {
    const cornerRef = useRef();
    const { products } = useServerData();
    const { offer } = useXProps();
    const [sticky, setSticky] = useState(false);
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [showApplyNow, setApplyNow] = useState(false);

    const initialProduct = arrayFind(products, prod => prod.meta.product === offer);
    // In case the product shown in the message, for some reason, does not come back with the modal
    // Ideally, this should never happen
    const [selectedProduct, setSelectedProduct] = useState(initialProduct ? offer : products[0].meta.product);

    useScroll(
        ({ target: { scrollTop } }) => {
            const { clientHeight: headerHeight } = headerRef.current;
            const { clientHeight: cornerHeight } = cornerRef.current;

            if (scrollTop >= headerHeight + cornerHeight) {
                if (!sticky) {
                    setSticky(true);
                }
            } else if (sticky) {
                setSticky(false);
            }
        },
        [sticky]
    );

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
        // Filter to a only the visible tab if this is a qualified offer
        .filter(
            tab => arrayEvery(products, prod => prod.meta.qualifying !== 'TRUE') || tab.product === selectedProduct
        );

    const setShowApplyNow = show => {
        if (selectedProduct === 'NI' && show !== showApplyNow) {
            setApplyNow(show);
        }
    };

    // Add the body of the tabs later to be able to reference the callbacks which reference the tabsMap
    tabsMap.GPL.body = <GPL switchTab={() => setSelectedProduct('NI')} />;

    tabsMap.NI.body = (
        <NI
            showApplyNow={setShowApplyNow}
            switchTab={() => {
                setApplyNow(false);
                setSelectedProduct('GPL');
            }}
        />
    );

    const tabsContent =
        tabs.length > 1 ? (
            <Tabs tabs={tabs} onSelect={index => setSelectedProduct(tabs[index].product)} />
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
