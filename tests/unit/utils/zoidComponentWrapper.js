/** @jsx h */
// TODO: Cleanup this rule being disabled
// eslint-disable-next-line import/no-extraneous-dependencies
import { h } from 'preact';

import { XPropsProvider, ServerDataProvider } from '@components/lib';

const wrapper = serverData => ({ children }) => (
    <XPropsProvider>
        <ServerDataProvider data={serverData}>{children}</ServerDataProvider>
    </XPropsProvider>
);

export default wrapper;
