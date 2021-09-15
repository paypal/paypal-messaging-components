/** @jsx h */
import { h } from 'preact';

import * as NI from './NI';
import * as EZP from './EZP';
import Tabs from '../../../parts/Tabs';
import { OFFER } from '../../../../../utils/constants';

const tabsMap = {
    [OFFER.EZP]: {
        title: 'Easy Payments',
        product: OFFER.EZP,
        header: <EZP.Header />,
        body: <EZP.Content />
    },
    [OFFER.PAYPAL_CREDIT_NO_INTEREST]: {
        title: '6 Months Special Financing',
        product: OFFER.PAYPAL_CREDIT_NO_INTEREST,
        header: <NI.Header />,
        body: <NI.Content />
    }
};

// EZP modal will always have EZP + NI
const Content = () => {
    return <Tabs tabs={[tabsMap[OFFER.EZP], tabsMap[OFFER.PAYPAL_CREDIT_NO_INTEREST]]} />;
};

export default Content;
