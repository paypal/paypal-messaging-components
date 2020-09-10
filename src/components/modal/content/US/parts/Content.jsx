/** @jsx h */
import { h } from 'preact';

import NI from './NI';
import GPL from './GPL';
import Tabs from '../../../parts/Tabs';
import { useServerData } from '../../../lib';

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

const Content = () => {
    const { products } = useServerData();

    const tabs = products.map(({ meta }) => tabsMap[meta.product]);

    return tabs.length > 1 ? <Tabs tabs={tabs} /> : <div className="tab-transition-item selected">{tabs[0].body}</div>;
};

export default Content;
