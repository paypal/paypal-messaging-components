/** @jsx h */
import { h } from 'preact';

import { XPropsProvider, ServerDataProvider } from 'src/components/modal/lib';

const wrapper = serverData => ({ children }) => (
    <XPropsProvider>
        <ServerDataProvider data={serverData}>{children}</ServerDataProvider>
    </XPropsProvider>
);
export default wrapper;
