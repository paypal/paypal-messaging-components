/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './styles/index.scss';
import Content from './parts/Content';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles._getCss()}>
            <Content />
        </Modal>,
        document.body
    );
}
