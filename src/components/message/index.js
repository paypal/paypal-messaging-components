/** @jsx h */
import { h, render } from 'preact';

import { XPropsProvider } from '../lib';
import Message from './Message';

export function setupMessage({ markup, meta }) {
    render(
        <XPropsProvider>
            <Message innerHTML={markup} meta={meta} />
        </XPropsProvider>,
        document.body
    );
}
