/** @jsx h */
import { h, render } from 'preact';

import Message from './Message';

// eslint-disable-next-line import/prefer-default-export
export function setupMessage(props) {
    render(<Message serverData={props} />, document.body);
}
