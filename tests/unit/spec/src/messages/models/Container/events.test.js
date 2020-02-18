import { fireEvent } from '@testing-library/dom';

import createContainer from 'utils/createContainer';
import eventsOn, { clearEvents } from 'src/messages/models/Container/events';

describe('events.js', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it("Contains 'on' and 'clear' functions", () => {
        const container = document.createElement('iframe');
        document.body.appendChild(container);
        const events = eventsOn(container);

        expect(events).toEqual(
            expect.objectContaining({
                on: expect.any(Function),
                clear: expect.any(Function)
            })
        );
    });

    describe.each([
        // eventType
        'click',
        'scroll',
        'hover',
        'resize'
    ])('each table, %s events', eventType => {
        // skip using div and span for resize events
        const containerTypes = ['iframe'].concat(eventType === 'resize' ? [] : ['div']);
        it.each(containerTypes)(`each Adds and clears ${eventType} event with %s container`, containerType => {
            const { container, getByText } = createContainer(containerType, '<h1>test</h1>');

            const eventCalls = {
                click: () => fireEvent.click(getByText(/test/i)),
                scroll: () => fireEvent.scroll(window),
                hover: () => fireEvent.mouseOver(container),
                resize: () => fireEvent(container.contentWindow, new Event('resize'))
            };

            const events = eventsOn(container);
            const handler = jest.fn();

            events.on(eventType, handler);

            expect(handler).toHaveBeenCalledTimes(0);

            eventCalls[eventType]();

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear(eventType);

            eventCalls[eventType]();

            expect(handler).toHaveBeenCalledTimes(1);

            events.on(eventType, handler);

            eventCalls[eventType]();

            expect(handler).toHaveBeenCalledTimes(2);
        });

        if (eventType !== 'resize') return;

        it.each(['div'])('Does not fire resize event with %s container', containerType => {
            const { container } = createContainer(containerType, '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('resize', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent(window, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(0);
        });
    });

    describe('clear all events', () => {
        it.each(['iframe', 'div'])('removes all events from %s container', containerType => {
            const { container, getByText } = createContainer(containerType, '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();
            const eventTypeCount = containerType === 'iframe' ? 4 : 3;

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);
            events.on('resize', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            if (containerType === 'iframe') {
                fireEvent(container.contentWindow, new Event('resize'));
            }

            expect(handler).toHaveBeenCalledTimes(eventTypeCount);

            clearEvents(container);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            if (containerType === 'iframe') {
                fireEvent(container.contentWindow, new Event('resize'));
            }

            expect(handler).toHaveBeenCalledTimes(eventTypeCount);

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);
            events.on('resize', handler);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            if (containerType === 'iframe') {
                fireEvent(container.contentWindow, new Event('resize'));
            }

            expect(handler).toHaveBeenCalledTimes(2 * eventTypeCount);
        });
    });
});
