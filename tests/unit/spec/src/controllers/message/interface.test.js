import Messages from 'src/controllers/message/interface';
import { Message } from 'src/zoid/message';
import { Modal } from 'src/controllers/modal';
import { destroyGlobalState, setGlobalState, logger } from 'src/utils';
import destroy from 'src/controllers/message/destroy';

jest.mock('src/zoid/message', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());

    return {
        Message: jest.fn(() => ({
            render: mockRender,
            updateProps: mockUpdateProps,
            state: {}
        }))
    };
});

jest.mock('src/controllers/modal', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());
    const mockShow = jest.fn(() => Promise.resolve());

    return {
        Modal: jest.fn(() => ({
            render: mockRender,
            updateProps: mockUpdateProps,
            show: mockShow
        }))
    };
});

jest.mock('src/utils/logger', () => ({
    logger: {
        warn: jest.fn(),
        track: jest.fn(),
        addMetaBuilder: jest.fn()
    }
}));

// Needed for attribute observer re-render test
window.paypal = { Messages };

const clearMocks = () => {
    logger.warn.mockClear();
    logger.track.mockClear();

    Message().render.mockClear();
    Message().updateProps.mockClear();
    Message.mockClear();

    Modal().render.mockClear();
    Modal().updateProps.mockClear();
    Modal().show.mockClear();
    Modal.mockClear();
};

describe('message interface', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        clearMocks();
        destroy();
    });

    // Possible bug with JSDOM MutationObserver implementation where it is
    // firing duplicate events from other messages being observed, so this test is first
    it('Re-renders on attribute change', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        await Messages({}).render(container);

        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Message().updateProps).not.toHaveBeenCalled();

        container.setAttribute('data-pp-amount', 100);

        // // Wait for mutation event to fire
        await new Promise(resolve => process.nextTick(resolve));

        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Message().updateProps).toHaveBeenCalledTimes(1);
    });

    it('Requires valid DOM selector', async () => {
        await Messages({}).render('.invalid');

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_selector'),
            expect.objectContaining({
                selector: '.invalid'
            })
        );
    });

    it('Requires the container to be in the document', async () => {
        const container = document.createElement('div');

        await Messages({}).render(container);

        expect(logger.warn).toHaveBeenCalledTimes(1);
        // This fixes an issue with the previous expect where using container with toHaveBeenLastCalledWith
        // caused the below error
        // TypeError: Cannot set property offsetParent of [object HTMLElement] which has only a getter
        // This may be linked to https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which
        const [string, object] = logger.warn.mock.calls[0];
        expect(string).toBe('not_in_document');
        expect(object.container).toBe(container);
    });

    it('Accepts a string selector, element reference, or mixed array', async () => {
        const containers = Array.from({ length: 2 }).map(() => {
            const container = document.createElement('div');
            container.classList.add('pp-message');

            document.body.appendChild(container);

            return container;
        });

        expect(Message).toHaveBeenCalledTimes(0);

        await Messages({}).render('.pp-message');

        expect(logger.warn).not.toHaveBeenCalled();
        expect(Message).toHaveBeenCalledTimes(2);
        expect(Message().render).toHaveBeenCalledTimes(2);
        expect(Message().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(2);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();
        destroyGlobalState();

        await Messages({}).render(containers[0]);

        expect(logger.warn).not.toHaveBeenCalled();
        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Message().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();
        destroyGlobalState();

        await Messages({}).render(containers);

        expect(logger.warn).not.toHaveBeenCalled();
        expect(Message).toHaveBeenCalledTimes(2);
        expect(Message().render).toHaveBeenCalledTimes(2);
        expect(Message().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(2);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        containers.forEach(container => document.body.removeChild(container));
    });

    it('Combines global, inline, and JavaScript options', async () => {
        // Global
        setGlobalState({ config: { account: 'DEV00000000NI' } });
        const container = document.createElement('div');
        // Inline
        container.setAttribute('data-pp-amount', 100); // Highest priority
        container.setAttribute('data-pp-style-layout', 'flex');
        document.body.appendChild(container);

        // JavaScript
        await Messages({ currency: 'USD', amount: 200 }).render(container);

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message).toHaveBeenLastCalledWith(
            expect.objectContaining({
                account: 'DEV00000000NI',
                amount: '100',
                currency: 'USD',
                style: {
                    layout: 'flex'
                }
            })
        );
        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal).toHaveBeenLastCalledWith(
            expect.objectContaining({
                account: 'DEV00000000NI',
                amount: '100',
                currency: 'USD'
            })
        );
        expect(Modal().render).not.toHaveBeenCalled();
    });

    it('Calls updateProps on re-render', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        await Messages({}).render(container);

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Message().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();

        await Messages({}).render(container);

        expect(Message).not.toHaveBeenCalled();
        expect(Message().render).not.toHaveBeenCalled();
        expect(Message().updateProps).toHaveBeenCalledTimes(1);
        expect(Modal).not.toHaveBeenCalled();
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();
    });

    it('Default renders to [data-pp-message]', async () => {
        const container = document.createElement('div');
        container.setAttribute('data-pp-message', true);
        document.body.appendChild(container);

        await Messages({}).render();

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message().render).toHaveBeenCalledTimes(1);
        expect(Message().render).toHaveBeenLastCalledWith(container);
    });

    it('Passes onRender handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onRender = jest.fn();

        await Messages({ onRender }).render(container);

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onReady: expect.any(Function)
            })
        );
        expect(onRender).not.toHaveBeenCalled();

        const [[{ onReady: onReadyHandler }]] = Message.mock.calls;

        onReadyHandler({ meta: { messageRequestId: '12345', trackingDetails: {} } });

        expect(onRender).toHaveBeenCalledTimes(1);
        expect(onRender).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345', trackingDetails: {} } });
    });

    it('Passes onClick handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onClick = jest.fn();

        await Messages({ onClick }).render(container);

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onClick: expect.any(Function)
            })
        );
        expect(onClick).not.toHaveBeenCalled();

        const [[{ onClick: onClickHandler }]] = Message.mock.calls;

        onClickHandler({ meta: { messageRequestId: '12345' } });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345' } });
    });

    it.skip('Passes onHover handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onHover = jest.fn();

        await Messages({ onHover }).render(container);

        expect(Message).toHaveBeenCalledTimes(1);
        expect(Message).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onHover: expect.any(Function)
            })
        );

        const [[{ onHover: onHoverHandler }]] = Message.mock.calls;

        onHoverHandler({ meta: { messageRequestId: '12345' } });

        expect(onHover).toHaveBeenCalledTimes(1);
        expect(onHover).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345' } });
    });
});
