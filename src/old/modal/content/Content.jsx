/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useXProps } from '../lib/hooks';
import { commonUS, USEzp, DEInst, GBPl } from '../styles';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import INST from './DE/INST';
import PL from './GB/PL';
import Tabs from '../parts/Tabs';

// modalType sent from server.
const Content = ({ products }) => {
    const { onReady } = useXProps();

    // Calling track here in order to use correct modal type from server.
    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ products });
        }
    }, [...products]);

    if (products.includes('EZP')) {
        return (
            <Fragment>
                <style>
                    {commonUS}
                    {USEzp}
                </style>
                <Tabs
                    tabs={[
                        {
                            tabKey: 'EZP',
                            title: 'Easy Payments',
                            header: <EZP.Header />,
                            body: <EZP.Content />
                        },
                        {
                            tabKey: 'NI',
                            title: '6 Months Special Financing',
                            header: <NI.Header />,
                            body: <NI.Content />
                        }
                    ]}
                />
            </Fragment>
        );
    }

    if (products.includes('NI')) {
        return (
            <Fragment>
                <style>{commonUS}</style>
                <NI.Header />
                <NI.Content />
            </Fragment>
        );
    }

    if (products.includes('INST')) {
        return (
            <Fragment>
                <style>{DEInst}</style>
                <INST />
            </Fragment>
        );
    }

    if (products.includes('PL')) {
        return (
            <Fragment>
                <style>{GBPl}</style>
                <PL />
            </Fragment>
        );
    }

    return null;
};

export default Content;
