import stats from 'src/utils/container/stats';

describe('stats', () => {
    let track;
    let events;
    let container;
    let options;
    beforeEach(() => {
        window.getComputedStyle = jest.fn(() => ({
            getPropertyValue: jest.fn(() => 'auto')
        }));
        track = jest.fn();
        options = { amount: 10 };
        events = { on: jest.fn(), clear: jest.fn() };
        container = {
            tagName: 'IFRAME',
            getBoundingClientRect: jest.fn(() => ({ left: 100, right: 20, top: 30, bottom: 25 })),
            hasAttribute: jest.fn(() => 'mockAttribute')
        };
    });

    it('when viewport is visible', async done => {
        stats(container, { events, options, track });
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
            blocked: true
        };

        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });
        expect(events.on).toHaveBeenCalledTimes(2);
        expect(track).toHaveBeenCalledTimes(2);
        const trackCalls = track.mock.calls;
        expect(trackCalls[0]).toEqual([payload, 'mockAttribute']);
        expect(trackCalls[1]).toEqual(['MORS_IMPRESSION']);
        const eventsCalls = events.on.mock.calls;
        expect(eventsCalls[0][0]).toEqual('click');
        expect(eventsCalls[1][0]).toEqual('hover');
        done();
    }, 9000);
    it('when viewport is not visible', async done => {
        window.innerHeight = 10;
        stats(container, { events, options, track });
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
            blocked: true
        };

        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });
        expect(events.on).toHaveBeenCalledTimes(3);
        expect(track).toHaveBeenCalledTimes(2);
        const trackCalls = track.mock.calls;
        expect(trackCalls[0]).toEqual([payload, 'mockAttribute']);
        expect(trackCalls[1]).toEqual(['MORS_IMPRESSION']);
        const eventsCalls = events.on.mock.calls;
        expect(eventsCalls[0][0]).toEqual('scroll');
        expect(eventsCalls[1][0]).toEqual('click');
        expect(eventsCalls[2][0]).toEqual('hover');
        done();
    }, 9000);

    it('when viewport is not visible and scroll event called', async done => {
        stats(container, { events, options, track });

        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });
        expect(events.on).toHaveBeenCalledTimes(3);
        track.mockClear();
        window.innerHeight = 768;
        const eventsCalls = events.on.mock.calls;
        expect(eventsCalls[0][0]).toEqual('scroll');
        eventsCalls[0][1]();
        expect(track).toHaveBeenCalledTimes(1);
        expect(events.clear).toHaveBeenCalledWith('scroll');
        const trackCalls = track.mock.calls;
        expect(trackCalls[0]).toEqual([{ et: 'CLIENT_IMPRESSION', event_type: 'scroll', visible: true }]);
        done();
    }, 9000);
    it('when viewport is not visible and click event called', async done => {
        window.innerHeight = 10;
        stats(container, { events, options, track });

        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });
        expect(events.on).toHaveBeenCalledTimes(3);

        track.mockClear();

        const eventsCalls = events.on.mock.calls;
        expect(eventsCalls[1][0]).toEqual('click');
        eventsCalls[1][1]();
        expect(track).toHaveBeenCalledTimes(2);
        const trackCalls = track.mock.calls;
        expect(trackCalls[0]).toEqual([{ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' }]);
        expect(trackCalls[1]).toEqual(['MORS_CLICK']);
        done();
    }, 9000);
    it('when viewport is not visible and hover event called', async done => {
        window.innerHeight = 10;
        stats(container, { events, options, track });

        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });
        expect(events.on).toHaveBeenCalledTimes(3);

        track.mockClear();

        const eventsCalls = events.on.mock.calls;
        expect(eventsCalls[2][0]).toEqual('hover');
        eventsCalls[2][1]();
        expect(track).toHaveBeenCalledTimes(1);
        const trackCalls = track.mock.calls;
        expect(trackCalls[0]).toEqual([{ et: 'CLIENT_IMPRESSION', event_type: 'hover' }]);
        expect(events.clear).toHaveBeenCalledWith('hover');
        done();
    }, 9000);
});
