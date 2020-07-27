/** @jsx h */
import { h } from 'preact';

import { TransitionStateProvider } from './lib';
import Container from './parts/Container';
import Content from './content/Content';
import { fonts, modalFrame, common } from './styles';

const Modal = () => (
    <TransitionStateProvider>
        <style>
            {fonts}
            {modalFrame}
            {common}
        </style>
        <Container>
            <Content />
        </Container>
    </TransitionStateProvider>
);

export default Modal;
