/** @jsx h */
import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

import NI from './NI';
import GPL from './GPL';
import Tabs from '../../../parts/Tabs';
import { useServerData, useScroll, useApplyNow } from '../../../lib';
import Button from '../../../parts/Button';

const tabsMap = {
    GPL: {
        title: 'Pay in 4',
        product: 'GPL',
        body: <GPL />
    },
    NI: {
        title: 'PayPal Credit',
        product: 'NI',
        body: <NI />
    }
};

const Content = ({ headerRef }) => {
    const cornerRef = useRef();
    const { products } = useServerData();
    const [sticky, setSticky] = useState(false);
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [showApplyNow, setApplyNow] = useState(false);

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

    useEffect(() => {
        const handleApplyNowShow = () => !showApplyNow && setApplyNow(true);
        const handleApplyNowHide = () => showApplyNow && setApplyNow(false);

        window.addEventListener('apply-now-visible', handleApplyNowShow);
        window.addEventListener('apply-now-hidden', handleApplyNowHide);

        return () => {
            window.removeEventListener('apply-now-visible', handleApplyNowShow);
            window.removeEventListener('apply-now-hidden', handleApplyNowHide);
        };
    }, [showApplyNow]);

    const tabs = products.map(({ meta }) => tabsMap[meta.product]);

    const tabsContent =
        tabs.length > 1 ? <Tabs tabs={tabs} /> : <div className="tab-transition-item selected">{tabs[0].body}</div>;

    return (
        <div className={`content ${sticky ? 'sticky' : ''}`}>
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
