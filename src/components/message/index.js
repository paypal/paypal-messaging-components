/** @jsx h */
import TestMessage from './Message';

export function setupMessage({ markup, meta, parentStyles, warnings }) {
    TestMessage(markup, meta, parentStyles, warnings, document.body);
}
