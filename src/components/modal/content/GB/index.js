/** @jsx h */
import { h, render } from 'preact';

import Modal from '../../parts/Modal';
import styles from './styles/index.scss';
import ContentWrapper from './parts/ContentWrapper';

export function setupModal(props) {
    render(
        <Modal serverData={props} styles={styles._getCss()}>
            <ContentWrapper contentMaxWidth={750} contentMaxHeight={537} />
        </Modal>,
        document.body
    );
}
