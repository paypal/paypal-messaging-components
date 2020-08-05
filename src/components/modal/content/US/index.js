/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './common--us.css';
import Content from './Content';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles}>
            <Content />
        </Modal>,
        document.body
    );
}
