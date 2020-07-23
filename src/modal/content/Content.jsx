/** @jsx h */
import { h, Fragment } from 'preact';

import { commonUS, USEzp, DEInst, GBPl } from '../styles';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import INST from './DE/INST';
import PL from './GB/PL';
import Tabs from '../parts/Tabs';

// Utilize a combination of offer type and country code to determine pre-selected tab.
const determineInitialTab = (type = 'NI', country = 'US') => {
    return {
        US: (() => {
            switch (type) {
                case 'NI':
                case 'NIQ':
                case 'NI:NON-US':
                    return 'US:NI';
                case 'EZP:ANY:EQZ':
                case 'EZP:ANY:GTZ':
                case 'PALA:MULTI:EQZ':
                case 'PALA:MULTI:GTZ':
                case 'PALA:SINGLE:EQZ':
                case 'PALA:SINGLE:GTZ':
                    return 'US:EZP';
                default:
                    return 'US:NI';
            }
        })(),
        DE: (() => {
            switch (type) {
                case 'INST:ANY:EQZ':
                case 'INST:ANY:GTZ':
                    return 'DE:INST';
                case 'PALAQ:ANY:EQZ':
                case 'PALAQ:ANY:GTZ':
                    return 'DE:PALAQ';
                default:
                    return 'DE:INST';
            }
        })(),
        GB: (() => {
            switch (type) {
                case 'PL':
                case 'PLQ':
                    return 'GB:PLQ';
                default:
                    return 'GB:PLQ';
            }
        })()
    }[country];
};

// type, country sent from serverData.
const Content = ({ modalType = 'NI', country = 'US' }) => {
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
                        // TODO :: Pass in offer type from messages call
                        initialTabKey={determineInitialTab(modalType, country)}
                        tabs={[
                            {
                                tabKey: 'US:EZP',
                                title: 'Easy Payments',
                                header: <EZP.Header />,
                                body: <EZP.Content />
                            },
                            {
                                tabKey: 'US:NI',
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
