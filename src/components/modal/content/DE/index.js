/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './styles/index.scss';
import Container from './parts/Container';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles._getCss()}>
            <Container />
        </Modal>,
        document.body
    );
}
