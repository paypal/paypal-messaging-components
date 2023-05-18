import createMessage from './Message';

export async function setupMessage({ markup, meta, parentStyles, warnings }) {
    const message = await createMessage({ markup, meta, parentStyles, warnings });
    document.body.appendChild(message);
}
