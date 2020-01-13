/** @jsx h */
import { h, Fragment } from 'preact';

import { useXProps } from '../lib/hooks';
import deInstStyle from '../styles/de--inst.css';
import usNiStyle from '../styles/us--ni.css';
import usEzpStyle from '../styles/us--ezp.css';
import * as NI from './US/NI';
import * as EZP from './US/EZP';
import INST from './DE/INST';
import Tabs from '../parts/Tabs';

const Content = () => {
    const { type } = useXProps();

    switch (type) {
        case 'NI':
            return (
                <Fragment>
                    <style>{usNiStyle}</style>
                    <NI.Header />
                    <NI.Content />
                </Fragment>
            );
        case 'EZP':
            return (
                <Fragment>
                    <style>{usNiStyle}</style>
                    <style>{usEzpStyle}</style>
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
                    <style>{deInstStyle}</style>
                    <INST />
                </Fragment>
            );
        default:
            return null;
    }
};

export default Content;
