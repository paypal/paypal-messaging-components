import { within } from '@testing-library/dom';

export default function createContainer(type, options = { body: '' }) {
    const { body, parent } =
        typeof options === 'string' || options instanceof HTMLElement ? { body: options } : options;
    const container = document.createElement(type);
    if (parent) {
        parent.appendChild(container);
    } else {
        document.body.appendChild(container);
    }

    if (type === 'iframe') {
        if (typeof body === 'string') {
            container.contentWindow.document.body.innerHTML = body.trim();
        } else {
            container.contentWindow.document.body.appendChild(body);
        }
        return { container, ...within(container.contentWindow.document) };
    }

    if (typeof body === 'string') {
        container.innerHTML = body.trim();
    } else {
        container.appendChild(body);
    }
    return { container, ...within(container) };
}
