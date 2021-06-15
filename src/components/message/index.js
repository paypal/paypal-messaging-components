/** @jsx h */
import Message from './Message';

export function setupMessage({ markup, meta, parentStyles, warnings }) {
    Message(markup, meta, parentStyles, warnings, document.body);
}
