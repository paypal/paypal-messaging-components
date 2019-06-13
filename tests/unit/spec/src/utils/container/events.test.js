describe('on Events from events listeners', () => {
    let container;
    let handler;
    let domEvent;
    let IframeEvent;
    // eslint-disable-next-line global-require
    let eventClass = require('src/utils/container/events');

    beforeEach(() => {
        document.addEventListener = jest.fn();
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        // eslint-disable-next-line global-require
        eventClass = require('src/utils/container/events');
        handler = jest.fn();

        container = {
            tagName: 'IFRAME',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            contentWindow: {
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                document: {
                    body: {
                        removeEventListener: jest.fn(),
                        addEventListener: jest.fn()
                    }
                }
            }
        };
        IframeEvent = {
            target: {
                ownerDocument: {
                    defaultView: {
                        frameElement: container
                    }
                }
            }
        };
        domEvent = {
            target: {},
            currentTarget: container
        };
    });
    it('addEventListenerTo should return an object with on and clear function defined', () => {
        const events = eventClass.default(container);
        const keys = Object.keys(events);
        expect(keys[0]).toEqual('on');
        expect(keys[1]).toEqual('clear');
        eventClass.clearEvents(container);
    });
    describe('click events', () => {
        it('when tagNAme is IFRAME', () => {
            const events = eventClass.default(container);
            events.on('click', handler);
            expect(container.contentWindow.document.body.addEventListener).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
        it('when tagName is not iframe', () => {
            container.tagName = 'div';
            const events = eventClass.default(container);
            events.on('click', handler);
            expect(container.addEventListener).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });

        it(' call onClick function', () => {
            container.tagName = 'IFRAME';
            const events = eventClass.default(container);
            events.on('click', handler);
            const clickEvent = container.contentWindow.document.body.addEventListener.mock.calls;

            clickEvent[0][1](IframeEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
        it('when tagName is not iframe', () => {
            container.tagName = 'div';
            const events = eventClass.default(container);
            events.on('click', handler);
            const clickEvent = container.addEventListener.mock.calls;

            clickEvent[0][1](domEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
    });
    describe('scroll events', () => {
        it('when scroll event triggered', () => {
            const events = eventClass.default(container);
            events.on('scroll', handler);
            expect(window.addEventListener).toHaveBeenCalledTimes(1);
            const clickEvent = window.addEventListener.mock.calls;

            clickEvent[0][1](IframeEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
    });
    describe('hover events', () => {
        it('when hover event triggered', () => {
            const evt = { target: container };
            const events = eventClass.default(container);
            events.on('hover', handler);
            expect(document.addEventListener).toHaveBeenCalledTimes(1);
            const clickEvent = document.addEventListener.mock.calls;

            clickEvent[0][1](evt);
            expect(handler).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
    });
    describe('message events', () => {
        it('when message event triggered', () => {
            const evt = { orign: window.top.location.origin, source: { frameElement: container } };
            const events = eventClass.default(container);
            events.on('message', handler);
            expect(window.addEventListener).toHaveBeenCalledTimes(1);
            const clickEvent = window.addEventListener.mock.calls;
            clickEvent[0][1](evt);
            expect(clickEvent[0][0]).toEqual('message');
            eventClass.clearEvents(container);
        });
    });
    describe('resize events', () => {
        it('when resize event triggered', () => {
            const evt = { target: { frameElement: container } };
            const events = eventClass.default(container);
            events.on('resize', handler);
            expect(container.contentWindow.addEventListener).toHaveBeenCalledTimes(1);
            const clickEvent = container.contentWindow.addEventListener.mock.calls;
            clickEvent[0][1](evt);
            expect(clickEvent[0][0]).toEqual('resize');
            expect(handler).toHaveBeenCalledTimes(1);
            eventClass.clearEvents(container);
        });
    });
    describe('clear All events', () => {
        it('perform clear events on scroll', () => {
            const events = eventClass.default(container);
            events.on('scroll', handler);
            eventClass.clearEvents(container);
            expect(window.removeEventListener).toHaveBeenCalledTimes(2);
            expect(container.contentWindow.removeEventListener).toHaveBeenCalledTimes(2);
        });
        it('perform clear events on hover', () => {
            const events = eventClass.default(container);
            events.on('hover', handler);
            eventClass.clearEvents(container);
            expect(document.removeEventListener).toHaveBeenCalledTimes(1);
            expect(container.contentWindow.removeEventListener).toHaveBeenCalledTimes(2);
        });
    });
    describe('clear events', () => {
        it('scroll', () => {
            const events = eventClass.default(container);
            events.on('scroll', handler);
            events.clear('scroll');

            expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        });
        it('hover', () => {
            const events = eventClass.default(container);
            events.on('hover', handler);
            events.clear('hover');
            expect(document.removeEventListener).toHaveBeenCalledTimes(1);
        });
        it('click', () => {
            const events = eventClass.default(container);
            events.on('click', handler);
            events.clear('click');
            expect(container.contentWindow.removeEventListener).toHaveBeenCalledTimes(1);
        });
        it('resize', () => {
            const events = eventClass.default(container);
            events.on('resize', handler);
            events.clear('resize');
            expect(container.contentWindow.removeEventListener).toHaveBeenCalledTimes(1);
        });
        it('message', () => {
            const events = eventClass.default(container);
            events.on('message', handler);
            events.clear('message');
            expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        });
    });
});
