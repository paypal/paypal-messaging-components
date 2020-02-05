/** @jsx h */
import { h } from 'preact';

import { ServerContext } from './lib/context';
import TransitionState from './lib/transition';
import Container from './parts/Container';
import Content from './content/Content';
import { fonts, modalFrame, common } from './styles';

const Modal = ({ serverData }) => (
    <ServerContext.Provider value={serverData}>
        <TransitionState>
            <style>
                {fonts}
                {modalFrame}
                {common}
            </style>
            <Container>
                <Content />
            </Container>
        </TransitionState>
    </ServerContext.Provider>
);

export default Modal;
