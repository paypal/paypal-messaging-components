/** @jsx h */
import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';

import { ServerContext } from '../lib/context';
import deInstStyle from '../styles/de--inst.css';
import usEzpStyle from '../styles/us--ezp.css';
import NI from './US/NI';
import EZP from './US/EZP';
import INST from './DE/INST';
import Tabs from '../parts/Tabs';

const Content = () => {
    const { type } = useContext(ServerContext);

    switch (type) {
        case 'NI':
            return <NI />;
        case 'EZP':
            return (
                <Fragment>
                    <style>{usEzpStyle}</style>
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
                    <style>{deInstStyle}</style>
                    <INST />
                </Fragment>
            );
        default:
            return null;
    }
};

export default Content;
