/** @jsx h */
import { h, render } from 'preact';

import Modal from './parts/Modal';
import BodyContent from './parts/BodyContent';

export function setupModal(props) {
    render(
        <Modal serverData={props}>
            <BodyContent />
        </Modal>,
        document.body
    );
}
