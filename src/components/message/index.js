import createMessage from './Message';

export function setupMessage({ markup, meta, parentStyles, warnings }) {
    const message = createMessage({ markup, meta, parentStyles, warnings });
    document.body.appendChild(message);
}
