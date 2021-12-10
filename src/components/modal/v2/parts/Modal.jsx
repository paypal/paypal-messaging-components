/** @jsx h */
import { h } from 'preact';

import { TransitionStateProvider, XPropsProvider, ServerDataProvider } from '../lib';
import Container from './Container';

import styles from '../styles/index.scss';

const Modal = ({ serverData, children }) => {
    return (
        <XPropsProvider>
            <ServerDataProvider data={serverData}>
                <TransitionStateProvider>
                    <style>{styles._getCss()}</style>
                    <Container>{children}</Container>
                </TransitionStateProvider>
            </ServerDataProvider>
        </XPropsProvider>
    );
};

export default Modal;
