/** @jsx h */
import { h, render } from 'preact';

import Modal from './Modal';

// eslint-disable-next-line import/prefer-default-export
export function setupModal(props) {
    console.log('setupModal', props);
    render(<Modal serverData={props} />, document.body);
}
