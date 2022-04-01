/** @jsx h */
import { h } from 'preact';

import * as NI from './NI';
import * as EZP from './EZP';
import Tabs from '../../../parts/Tabs';

const tabsMap = {
    EZP: {
        title: 'Easy Payments',
        product: 'EZP',
        header: <EZP.Header />,
        body: <EZP.Content />
    },
    NI: {
        title: '6 Months Special Financing',
        product: 'NI',
        header: <NI.Header />,
        body: <NI.Content />
    }
};

// EZP modal will always have EZP + NI
const Content = () => {
    return <Tabs tabs={[tabsMap.EZP, tabsMap.NI]} />;
};

export default Content;
