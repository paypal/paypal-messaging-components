/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './gb--pl.css';
import Content from './PL';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles}>
            <Content />
        </Modal>,
        document.body
    );
}
