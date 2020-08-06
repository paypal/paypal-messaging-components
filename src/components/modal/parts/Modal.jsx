/** @jsx h */
import { h } from 'preact';

import { XPropsProvider, ServerDataProvider } from '../../lib';
import { TransitionStateProvider } from '../lib';
import { fonts, modalFrame, common } from '../styles';

const Modal = ({ styles, serverData, children }) => (
    <XPropsProvider>
        <ServerDataProvider data={serverData}>
            <TransitionStateProvider>
                <style>
                    {fonts}
                    {modalFrame}
                    {common}
                    {styles}
                </style>
                {children}
            </TransitionStateProvider>
        </ServerDataProvider>
    </XPropsProvider>
);

export default Modal;
