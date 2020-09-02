/** @jsx h */
import { h, render } from 'preact';

import Modal from './Modal';

export function setupModal(props) {
    render(<Modal serverData={props} />, document.body);
}
