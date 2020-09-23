/** @jsx h */
import { h, Fragment } from 'preact';

import * as NI from './NI';
import * as EZP from './EZP';
import Tabs from '../../../parts/Tabs';
import { useServerData } from '../../../lib';

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
const Content = () => {
    const { products } = useServerData();

    if (products.length === 1) {
        return (
            <Fragment>
                {tabsMap[products[0]]?.header}
                {tabsMap[products[0]]?.body}
            </Fragment>
        );
    }
    return <Tabs tabs={[tabsMap.EZP, tabsMap.NI]} />;
};

export default Content;
