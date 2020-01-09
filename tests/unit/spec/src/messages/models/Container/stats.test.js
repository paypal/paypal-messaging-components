import { fireEvent } from '@testing-library/dom';
import createContainer from 'utils/createContainer';
import eventsOn from 'src/messages/models/Container/events';
import stats from 'src/messages/models/Container/stats';

window.getComputedStyle = () => ({
    getPropertyValue: () => 'auto'
});

const createMockRenderObject = container => ({
    events: eventsOn(container),
    track: jest.fn(),
    options: {
        account: '',
        placement: '',
        amount: 10
    }
});

describe('stats', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('Fires standard payload and attaches events', async () => {
        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        const mockRenderObject = createMockRenderObject(container);
        const eventsOnSpy = jest.spyOn(mockRenderObject.events, 'on');
        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            pos_x: 100,
            pos_y: 30,
            browser_width: 1024,
            browser_height: 768,
            visible: true,
            amount: 10,
            adblock: true,
            blocked: true,
            calling_client_id: 'messaging.js',
            placement: '',
            mapv: expect.any(String)
        };

        stats(container, mockRenderObject);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(mockRenderObject.track).toHaveBeenCalledTimes(2);
        expect(mockRenderObject.track).toHaveBeenNthCalledWith(1, payload, false);
        expect(mockRenderObject.track).toHaveBeenNthCalledWith(2, 'MORS_IMPRESSION');

        expect(eventsOnSpy).toHaveBeenCalledTimes(2);
        expect(eventsOnSpy).toHaveBeenCalledWith('click', expect.any(Function));
        expect(eventsOnSpy).toHaveBeenCalledWith('hover', expect.any(Function));
        expect(eventsOnSpy).not.toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('Fires scroll event when loads below fold and scrolls into view', async () => {
        window.innerHeight = 10;

        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        const mockRenderObject = createMockRenderObject(container);
        const eventsOnSpy = jest.spyOn(mockRenderObject.events, 'on');
        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            pos_x: 100,
            pos_y: 30,
            browser_width: 1024,
            browser_height: 10,
            visible: false,
            amount: 10,
            adblock: true,
            blocked: true,
            calling_client_id: 'messaging.js',
            placement: '',
            mapv: expect.any(String)
        };

        stats(container, mockRenderObject);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(mockRenderObject.track).toHaveBeenCalledTimes(2);
        expect(mockRenderObject.track).toHaveBeenCalledWith(payload, false);
        expect(mockRenderObject.track).toHaveBeenCalledWith('MORS_IMPRESSION');

        expect(eventsOnSpy).toHaveBeenCalledTimes(3);
        expect(eventsOnSpy).toHaveBeenCalledWith('click', expect.any(Function));
        expect(eventsOnSpy).toHaveBeenCalledWith('hover', expect.any(Function));
        expect(eventsOnSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 0,
            bottom: 5
        });

        fireEvent.scroll(window);

        expect(mockRenderObject.track).toHaveBeenCalledTimes(3);
        expect(mockRenderObject.track).toHaveBeenLastCalledWith({
            et: 'CLIENT_IMPRESSION',
            event_type: 'scroll',
            visible: true
        });
    });

    it('Fires click event when message clicked', () => {
        const { container, getByText } = createContainer('iframe', '<h1>test</h1>');
        const mockRenderObject = createMockRenderObject(container);

        stats(container, mockRenderObject);

        expect(mockRenderObject.track).not.toHaveBeenCalledWith('MORS_CLICK');

        fireEvent.click(getByText(/test/i));

        expect(mockRenderObject.track).toHaveBeenCalledWith({
            et: 'CLICK',
            event_type: 'click',
            link: 'Banner Wrapper'
        });
        expect(mockRenderObject.track).toHaveBeenCalledWith('MORS_CLICK');
    });

    it('Fires hover event when message hovered', () => {
        const { container } = createContainer('iframe', '<h1>test</h1>');
        const mockRenderObject = createMockRenderObject(container);

        stats(container, mockRenderObject);

        const trackCalls = mockRenderObject.track.mock.calls.length;

        fireEvent.mouseOver(container);

        expect(mockRenderObject.track).toHaveBeenCalledTimes(trackCalls + 1);
        expect(mockRenderObject.track).toHaveBeenCalledWith({
            et: 'CLIENT_IMPRESSION',
            event_type: 'hover'
        });

        fireEvent.mouseOver(container);

        expect(mockRenderObject.track).toHaveBeenCalledTimes(trackCalls + 1);
    });
});
