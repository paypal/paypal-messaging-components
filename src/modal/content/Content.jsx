/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useXProps } from '../lib/hooks';
import { commonUS, USEzp } from '../styles';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import Tabs from '../parts/Tabs';

// modalType sent from server.
const Content = ({ modalType }) => {
    const { onReady } = useXProps();

    // Calling track here in order to use correct modal type from server.
    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ modalType });
        }
    }, [modalType]);

    switch (modalType) {
        case 'NI':
            return (
                <Fragment>
                    <style>{commonUS}</style>
                    <NI.Header />
                    <NI.Content />
                </Fragment>
            );
        case 'EZP':
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
        default:
            return null;
    }
};

export default Content;
