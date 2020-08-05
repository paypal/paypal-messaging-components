/** @jsx h */
import { h } from 'preact';

import { XPropsProvider, ServerDataProvider } from '../../lib';
import { TransitionStateProvider } from '../lib';
import Container from './Container';
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
                <Container>{children}</Container>
            </TransitionStateProvider>
        </ServerDataProvider>
    </XPropsProvider>
);

export default Modal;
