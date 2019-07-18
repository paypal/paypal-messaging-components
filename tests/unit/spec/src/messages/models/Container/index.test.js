import createContainer from 'src/messages/models/Container';

jest.mock('src/messages/models/Container/events', () => ({
    __esModule: true,
    default: jest.fn(container => () => ({ name: 'events', container })),
    clearEvents: jest.fn(container => ({ name: 'clearEvents', container }))
}));

jest.mock('src/messages/models/Container/insertMarkup', () =>
    jest.fn(container => () => ({ name: 'insertMarkup', container }))
);

jest.mock('src/messages/models/Container/stats', () => jest.fn(container => () => ({ name: 'stats', container })));

jest.mock('src/messages/models/Container/setSize', () => jest.fn(container => () => ({ name: 'setSize', container })));

describe('createContainer', () => {
    it('should create an iframe', () => {
        const [container, helperFns] = createContainer('iframe');

        expect(container.tagName).toBe('IFRAME');

        const insertMarkup = helperFns.insertMarkup();
        expect(insertMarkup.name).toBe('insertMarkup');
        expect(insertMarkup.container).toBe(container);

        const stats = helperFns.runStats();
        expect(stats.name).toBe('stats');
        expect(stats.container).toBe(container);

        const setSize = helperFns.setSize();
        expect(setSize.name).toBe('setSize');
        expect(setSize.container).toBe(container);

        const type = 'type';
        Object.defineProperty(container, 'contentWindow', {
            value: {
                postMessage: jest.fn()
            }
        });

        helperFns.postMessage('type');
        const postMessageBody = JSON.parse(container.contentWindow.postMessage.mock.calls[0][0]);
        expect(postMessageBody['pp-modal-event'].type).toBe(type);

        const events = helperFns.events();
        expect(events.name).toBe('events');
        expect(events.container).toBe(container);

        const clearEvents = helperFns.clearEvents();
        expect(clearEvents.name).toBe('clearEvents');
        expect(clearEvents.container).toBe(container);
    });

    it('should create a div', () => {
        const [container, helperFns] = createContainer('div');

        expect(container.tagName).toBe('DIV');

        const insertMarkup = helperFns.insertMarkup();
        expect(insertMarkup.name).toBe('insertMarkup');
        expect(insertMarkup.container).toBe(container);

        const stats = helperFns.runStats();
        expect(stats.name).toBe('stats');
        expect(stats.container).toBe(container);

        const setSize = helperFns.setSize();
        expect(setSize.name).toBe('setSize');
        expect(setSize.container).toBe(container);

        Object.defineProperty(container, 'contentWindow', {
            value: {
                postMessage: jest.fn()
            }
        });

        helperFns.postMessage('type');
        expect(container.contentWindow.postMessage).not.toHaveBeenCalled();

        const events = helperFns.events();
        expect(events.name).toBe('events');
        expect(events.container).toBe(container);

        const clearEvents = helperFns.clearEvents();
        expect(clearEvents.name).toBe('clearEvents');
        expect(clearEvents.container).toBe(container);
    });
});
