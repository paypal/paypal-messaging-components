/** @jsx h */
import { h, Fragment } from 'preact';

import { useXProps } from '../lib/hooks';
import deInstStyle from '../styles/de--inst.scss';
import usEzpStyle from '../styles/us--ezp.scss';
import NI from './US/NI';
import EZP from './US/EZP';
import INST from './DE/INST';
import Tabs from '../parts/Tabs';

const Content = () => {
    const { type } = useXProps();

    switch (type) {
        case 'NI':
            return <NI />;
        case 'EZP':
            return (
                <Fragment>
                    <style>{usEzpStyle._getCss()}</style>
                    <Tabs
                        tabs={[
                            {
                                title: 'Easy Payments',
                                body: <EZP />
                            },
                            {
                                title: '6 Months Special Financing',
                                body: <NI />
                            }
                        ]}
                    />
                </Fragment>
            );
        case 'INST':
            return (
                <Fragment>
                    <style>{deInstStyle._getCss()}</style>
                    <INST />
                </Fragment>
            );
        default:
            return null;
    }
};

export default Content;
