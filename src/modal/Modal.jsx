/** @jsx h */
import { h } from 'preact';

import { ServerContext } from './lib/context';
import TransitionState from './lib/transition';
import Container from './parts/Container';
import Content from './content/Content';
import styles from './styles/common.scss';

const Modal = ({ serverData }) => (
    <ServerContext.Provider value={serverData}>
        <TransitionState>
            <style>{styles._getCss()}</style>
            <Container>
                <Content />
            </Container>
        </TransitionState>
    </ServerContext.Provider>
);

export default Modal;
