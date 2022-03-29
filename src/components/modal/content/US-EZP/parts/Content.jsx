/** @jsx h */
import { h } from 'preact';

import * as NI from './NI';
import * as EZP from './EZP';
import Tabs from '../../../parts/Tabs';

import { OFFER } from '../../../../../utils/constants';

const tabsMap = {
    PAYPAL_CREDIT_INSTALLMENTS: {
        title: 'Easy Payments',
        product: OFFER.PAYPAL_CREDIT_INSTALLMENTS,
        header: <EZP.Header />,
        body: <EZP.Content />
    },
    PAYPAL_CREDIT_NO_INTEREST: {
        title: '6 Months Special Financing',
        product: OFFER.PAYPAL_CREDIT_NO_INTEREST,
        header: <NI.Header />,
        body: <NI.Content />
    }
};

// EZP modal will always have EZP + PAYPAL_CREDIT_NO_INTEREST
const Content = () => {
    return <Tabs tabs={[tabsMap.PAYPAL_CREDIT_INSTALLMENTS, tabsMap.PAYPAL_CREDIT_NO_INTEREST]} />;
};

export default Content;
