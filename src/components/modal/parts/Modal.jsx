/** @jsx h */
import { h } from 'preact';

import { XPropsProvider, ServerDataProvider } from '../../lib';
import { TransitionStateProvider } from '../lib';
import commonStyles from '../styles/index.scss';

const Modal = ({ styles, serverData, children }) => (
    <XPropsProvider>
        <ServerDataProvider data={serverData}>
            <TransitionStateProvider>
                <style>
                    {commonStyles._getCss()}
                    {styles}
                </style>
                {children}
            </TransitionStateProvider>
        </ServerDataProvider>
    </XPropsProvider>
);

export default Modal;
