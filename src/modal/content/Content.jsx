/** @jsx h */
import { h, Fragment } from 'preact';

import { useXProps } from '../lib/hooks';
import { commonUS, USEzp, DEInst, GBPl } from '../styles';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import INST from './DE/INST';
import PL from './GB/PL';
import Tabs from '../parts/Tabs';

// Utilize a combination of offer type and country code to determine pre-selected tab.
const determineInitialTab = (type = 'NI', country = 'US') => {
    switch (country) {
        case 'US':
            return [
                'EZP:ANY:EQZ',
                'EZP:ANY:GTZ',
                'PALA:MULTI:EQZ',
                'PALA:MULTI:GTZ',
                'PALA:SINGLE:EQZ',
                'PALA:SINGLE:GTZ'
            ].includes(type)
                ? 'EZP'
                : 'NI';
        case 'DE':
            return 'INST';
        case 'GB':
            return 'PL';
        default:
            return 'NI';
    }
};

// Props type, country sent from serverData.
const Content = ({ modalType, country }) => {
    // Type of the banner displayed to user.
    const { type } = useXProps();

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
                        initialTabKey={determineInitialTab(type, country)}
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
