/** @jsx h */
import { h } from 'preact';

import * as NI from './NI';
import * as EZP from './EZP';
import Tabs from '../../../parts/Tabs';

const Content = () => (
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
);

export default Content;
