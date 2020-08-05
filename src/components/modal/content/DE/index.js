/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './de--inst.css';
import Content from './INST';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles}>
            <Content />
        </Modal>,
        document.body
    );
}
