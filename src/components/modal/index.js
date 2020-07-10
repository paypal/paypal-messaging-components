/** @jsx h */
import { h, render } from 'preact';

import { XPropsProvider, ServerDataProvider } from '../lib';
import Modal from './Modal';

export function setupModal(props) {
    render(
        <XPropsProvider>
            <ServerDataProvider data={props}>
                <Modal />
            </ServerDataProvider>
        </XPropsProvider>,
        document.body
    );
}
