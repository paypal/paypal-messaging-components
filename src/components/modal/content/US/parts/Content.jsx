/** @jsx h */
import { h } from 'preact';

import NI from './NI';
import PI4 from './PI4';
import PI4Q from './PI4Q';
import Tabs from '../../../parts/Tabs';
import { useServerData } from '../../../lib';

const tabsMap = {
    PI4: {
        title: 'Pay in 4',
        product: 'PI4',
        body: <PI4 />
    },
    PI4Q: {
        title: 'Pay in 4',
        product: 'PI4Q',
        body: <PI4Q />
    },
    NI: {
        title: 'PayPal Credit',
        product: 'NI',
        body: <NI />
    }
};

const Content = () => {
    const { products } = useServerData();

    return <Tabs tabs={products.map(prod => tabsMap[prod])} />;
};

export default Content;
