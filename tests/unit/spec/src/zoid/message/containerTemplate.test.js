import { EVENT } from '@krakenjs/zoid/src';

jest.mock('src/utils', () => ({
    getOverflowObserver: jest.fn(() => Promise.resolve({ observe: jest.fn() })),
    createTitleGenerator: jest.fn(() => title => title)
}));

const containerTemplate = require('src/library/zoid/message/containerTemplate').default;

const createEventEmitter = () => {
    const listeners = {};
    const onceListeners = {};
    return {
        on: (name, cb) => {
            listeners[name] = listeners[name] || [];
            listeners[name].push(cb);
        },
        once: (name, cb) => {
            onceListeners[name] = onceListeners[name] || [];
            onceListeners[name].push(cb);
        },
        trigger: (name, payload) => {
            (listeners[name] || []).forEach(cb => cb(payload));
            (onceListeners[name] || []).forEach(cb => cb(payload));
            delete onceListeners[name];
        }
    };
};

const renderTemplate = style => {
    const event = createEventEmitter();
    const container = document.createElement('div');
    const frame = document.createElement('iframe');
    const prerenderFrame = document.createElement('iframe');

    const rendered = containerTemplate({
        uid: 'uid',
        frame,
        prerenderFrame,
        doc: document,
        event,
        props: { style },
        container
    });

    container.appendChild(rendered);
    document.body.appendChild(container);

    return { event, container };
};

describe('zoid/message/containerTemplate', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('Sets placeholder min-height for text layout', () => {
        const { container } = renderTemplate({ layout: 'text', text: { size: 12 } });
        expect(container.style.minHeight).toBe('15.6px');
    });

    test('Uses default text size when style text size is invalid', () => {
        const { container } = renderTemplate({ layout: 'text', text: { size: 99 } });
        expect(container.style.minHeight).toBe('18.2px');
    });

    test('Clears placeholder min-height on first resize with rendered content dimensions', () => {
        const { event, container } = renderTemplate({ layout: 'text', text: { size: 12 } });
        expect(container.style.minHeight).toBe('15.6px');

        event.trigger(EVENT.RESIZE, { width: 100, height: 0 });
        expect(container.style.minHeight).toBe('');
    });

    test('Clears placeholder min-height on first resize with no-message dimensions (0x0)', () => {
        const { event, container } = renderTemplate({ layout: 'text', text: { size: 12 } });
        expect(container.style.minHeight).toBe('15.6px');

        event.trigger(EVENT.RESIZE, { width: 0, height: 0 });
        expect(container.style.minHeight).toBe('');
    });

    test('Does not set placeholder min-height for flex layout', () => {
        const { container } = renderTemplate({ layout: 'flex' });
        expect(container.style.minHeight).toBe('');
    });
});
