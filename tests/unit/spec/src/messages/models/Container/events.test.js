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

    describe('click events', () => {
        it('Adds and clears click event with iframe container', () => {
            const { container, getByText } = createContainer('iframe', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('click', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('click');

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('click', handler);

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(2);
        });

        it('Adds and clears click event with div container', () => {
            const { container, getByText } = createContainer('div', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('click', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('click');

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('click', handler);

            fireEvent.click(getByText(/test/i));

            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('scroll events', () => {
        it('Adds and clears scroll event with iframe container', () => {
            const { container } = createContainer('iframe', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('scroll', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('scroll');

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('scroll', handler);

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(2);
        });

        it('Adds and clears scroll event with div container', () => {
            const { container } = createContainer('div', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('scroll', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('scroll');

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('scroll', handler);

            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('hover events', () => {
        it('Adds and clears hover event with iframe container', () => {
            const { container } = createContainer('iframe', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('hover', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('hover');

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('hover', handler);

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(2);
        });

        it('Adds and clears hover event with div container', () => {
            const { container } = createContainer('div', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('hover', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('hover');

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('hover', handler);

            fireEvent.mouseOver(container);

            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('resize events', () => {
        it('Adds and clears resize event with iframe container', () => {
            const { container } = createContainer('iframe', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('resize', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(1);

            events.clear('resize');

            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(1);

            events.on('resize', handler);

            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(2);
        });

        it('Does not fire resize event with div container', () => {
            const { container } = createContainer('div', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('resize', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent(window, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(0);
        });
    });

    describe('clear all events', () => {
        it('removes all events from iframe container', () => {
            const { container, getByText } = createContainer('iframe', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);
            events.on('resize', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(4);

            clearEvents(container);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(4);

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);
            events.on('resize', handler);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);
            fireEvent(container.contentWindow, new Event('resize'));

            expect(handler).toHaveBeenCalledTimes(8);
        });

        it('removes all events from div container', () => {
            const { container, getByText } = createContainer('div', '<h1>test</h1>');
            const events = eventsOn(container);
            const handler = jest.fn();

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);

            expect(handler).toHaveBeenCalledTimes(0);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(3);

            clearEvents(container);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(3);

            events.on('click', handler);
            events.on('hover', handler);
            events.on('scroll', handler);

            fireEvent.click(getByText(/test/i));
            fireEvent.mouseOver(container);
            fireEvent.scroll(window);

            expect(handler).toHaveBeenCalledTimes(6);
        });
    });
});
