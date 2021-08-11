/** @jsx node */
import { fireEvent } from '@testing-library/dom';
import { node, dom } from 'jsx-pragmatic/src';
import { createState, getDataByTag, createEvent, viewportHijack, dynamicImport } from 'src/utils';

jest.mock('src/utils/observers', () => ({}));

describe('utils/miscellaneous', () => {
    describe('createState', () => {
        test('Creates a state object', () => {
            const [state, setState] = createState({ x: 1, y: 1 });

            expect(state).toEqual({
                x: 1,
                y: 1
            });
            expect(setState).toEqual(expect.any(Function));

            setState({ y: 2 });

            expect(state).toEqual({
                x: 1,
                y: 2
            });

            setState({ x: 3, z: 5 });

            expect(state).toEqual({
                x: 3,
                y: 2,
                z: 5
            });
        });
    });

    describe('getDataByTag', () => {
        const data = [
            ['Message one', ['default', 'small']],
            ['Message two', ['medium']],
            ['Message three', ['medium.2', 'large']]
        ];

        test('Retrieves a message by tag', () => {
            expect(getDataByTag(data, 'small')).toBe('Message one');
            expect(getDataByTag(data, 'medium')).toBe('Message two');
            expect(getDataByTag(data, 'medium.2')).toBe('Message three');
        });

        test('Falls back to default if tag is missing', () => {
            expect(getDataByTag(data, 'xlarge')).toBe('Message one');
            expect(getDataByTag(data, 'xlarge.3')).toBe('Message one');
        });

        test('Falls back to main tag if sub-tag is missing', () => {
            expect(getDataByTag(data, 'medium.3')).toBe('Message two');
        });

        test('Returns empty string when no default provided', () => {
            expect(getDataByTag([['Message one', ['small']]], 'large')).toBe('');
        });
    });

    describe('createEvent', () => {
        test('Returns an event object', () => {
            const event = createEvent('click');

            expect(typeof event).toBe('object');
            expect(event.type).toBe('click');

            // IE11 event
            const { Event } = window;
            delete window.Event;

            const ieEvent = createEvent('click');

            expect(typeof ieEvent).toBe('object');
            expect(ieEvent.type).toBe('click');

            window.Event = Event;
        });
    });

    describe('viewportHijack', () => {
        afterEach(() => {
            document.head.innerHTML = '';
        });

        test('Reuses existing viewport', () => {
            const defaultViewport = (<meta name="viewport" content="test=true" />).render(dom({ doc: document }));
            document.head.appendChild(defaultViewport);

            const [hijackViewport, replaceViewport] = viewportHijack(0);

            expect(defaultViewport).toBeInTheDocument();

            hijackViewport();

            const currentViewport = document.head.querySelector('meta[name="viewport"]');

            expect(currentViewport).toBe(defaultViewport);
            expect(defaultViewport).toBeInTheDocument();
            expect(currentViewport.getAttribute('content')).toBe(
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            replaceViewport();

            expect(currentViewport).toBe(defaultViewport);
            expect(defaultViewport).toBeInTheDocument();
        });

        test('Creates an empty viewport if one is missing', () => {
            expect(document.head.querySelector('meta[name="viewport"]')).toBeNull();

            const [hijackViewport, replaceViewport] = viewportHijack(1);

            expect(document.head.querySelector('meta[name="viewport"]')).not.toBeNull();

            hijackViewport();

            const newViewport = document.head.querySelector('meta[name="viewport"]');

            expect(newViewport.getAttribute('content')).toBe(
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            replaceViewport();
        });

        test('Removes scrollbar with overflow hidden', () => {
            const [hijackViewport, replaceViewport] = viewportHijack(2);

            expect(document.body.getAttribute('style')).toBe('');

            hijackViewport();

            expect(document.body.getAttribute('style')).toBe('overflow: hidden;');

            replaceViewport();

            expect(document.body.getAttribute('style')).toBe('');

            document.body.style.display = 'block';
            document.body.style.color = 'black';

            hijackViewport();

            expect(document.body.getAttribute('style')).toBe('display: block; color: black; overflow: hidden;');

            replaceViewport();

            expect(document.body.getAttribute('style')).toBe('display: block; color: black;');
        });
    });

    describe('request', () => {
        it.todo('tests');
    });

    describe('dynamicImport', () => {
        test('loads a script', async () => {
            const url = 'https://www.paypalobjects.com/upstream/bizcomponents/js/messaging.js';
            const loadPromise = dynamicImport(url);

            expect(document.querySelectorAll('script')).toHaveLength(1);
            expect(document.querySelector('script')).toHaveAttribute('src', url);

            fireEvent.load(document.querySelector('script'));
            await loadPromise;

            expect(document.querySelectorAll('script')).toHaveLength(0);

            // Import should be memoized
            dynamicImport(url);
            expect(document.querySelectorAll('script')).toHaveLength(0);
        });
    });
});
