/** @jsx h */
import { h, render } from 'preact';

import { XPropsProvider, ServerDataProvider } from '../lib';
import Message from './Message';

export function setupMessage({ markup, meta, parentStyles, warnings }) {
    render(
        <XPropsProvider>
            <ServerDataProvider data={{ markup, meta, parentStyles, warnings }}>
                <Message />
            </ServerDataProvider>
        </XPropsProvider>,
        document.body
    );
}
