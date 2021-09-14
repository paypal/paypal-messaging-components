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
    PAYPAL_CREDIT_NO_INTEREST: {
        title: '6 Months Special Financing',
        product: 'PAYPAL_CREDIT_NO_INTEREST',
        header: <NI.Header />,
        body: <NI.Content />
    }
};

// EZP modal will always have EZP + NI
const Content = () => {
    return <Tabs tabs={[tabsMap.EZP, tabsMap.PAYPAL_CREDIT_NO_INTEREST]} />;
};

export default Content;
