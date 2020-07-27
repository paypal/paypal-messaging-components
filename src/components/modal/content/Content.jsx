/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData } from '../lib';
import { commonUS, USEzp, DEInst, GBPl } from '../styles';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import INST from './DE/INST';
import PL from './GB/PL';
import Tabs from '../parts/Tabs';

const Content = () => {
    const { type } = useServerData();

    switch (type) {
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
                                title: 'Easy Payments',
                                header: <EZP.Header />,
                                body: <EZP.Content />
                            },
                            {
                                title: '6 Months Special Financing',
                                header: <NI.Header />,
                                body: <NI.Content />
                            }
                        ]}
                    />
                </Fragment>
            );
        case 'INST':
            return (
                <Fragment>
                    <style>{DEInst}</style>
                    <INST />
                </Fragment>
            );
        case 'PL':
            return (
                <Fragment>
                    <style>{GBPl}</style>
                    <PL />
                </Fragment>
            );
        default:
            return null;
    }
};

export default Content;
