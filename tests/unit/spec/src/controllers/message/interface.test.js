import Messages from 'src/library/controllers/message/interface';
import { getMessageComponent } from 'src/library/zoid/message';
import { Modal } from 'src/library/controllers/modal';
import { destroyGlobalState, setGlobalState, logger } from 'src/utils';
import destroy from 'src/library/controllers/message/destroy';

jest.mock('src/library/zoid/message', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());
    const mockCreateMessage = jest.fn(() => ({
        render: mockRender,
        updateProps: mockUpdateProps,
        state: {}
    }));

    return {
        getMessageComponent: () => mockCreateMessage
    };
});

jest.mock('src/library/controllers/modal', () => {
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

jest.mock('src/utils/events', () => {
    const events = jest.requireActual('src/utils/events');

    return {
        ...events,
        awaitTreatments: Promise.resolve()
    };
});

jest.mock('src/utils/sdk', () => ({
    ...jest.requireActual('src/utils/sdk'),
    isScriptBeingDestroyed: () => false
}));

// Needed for attribute observer re-render test
window.paypal = { Messages };

const clearMocks = () => {
    logger.warn.mockClear();
    logger.track.mockClear();

    getMessageComponent()().render.mockClear();
    getMessageComponent()().updateProps.mockClear();
    getMessageComponent().mockClear();

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
    test('Re-renders on attribute change', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        await Messages({}).render(container);

        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().updateProps).not.toHaveBeenCalled();

        container.setAttribute('data-pp-amount', 100);

        // // Wait for mutation event to fire
        await new Promise(resolve => process.nextTick(resolve));

        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().updateProps).toHaveBeenCalledTimes(1);
    });

    test('Requires valid DOM selector', async () => {
        await Messages({}).render('.invalid');

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_selector'),
            expect.objectContaining({
                selector: '.invalid'
            })
        );
    });

    test('Requires the container to be in the document', async () => {
        const container = document.createElement('div');

        await Messages({}).render(container);

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('not_in_document'),
            expect.objectContaining({
                // Passing the container as a ref here causes some jest/babel compiling issue
                container: expect.any(Object)
            })
        );

        const [, { container: warningContainer }] = logger.warn.mock.calls[0];

        expect(warningContainer).toBe(container);
    });

    test('Accepts a string selector, element reference, or mixed array', async () => {
        const containers = Array.from({ length: 2 }).map(() => {
            const container = document.createElement('div');
            container.classList.add('pp-message');

            document.body.appendChild(container);

            return container;
        });

        expect(getMessageComponent()).toHaveBeenCalledTimes(0);

        await Messages({ account: 'DEV00000000NI' }).render('.pp-message');

        expect(logger.warn).not.toHaveBeenCalled();
        expect(getMessageComponent()).toHaveBeenCalledTimes(2);
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(2);
        expect(getMessageComponent()().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(2);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();
        destroyGlobalState();

        await Messages({ account: 'DEV00000000NI' }).render(containers[0]);

        expect(logger.warn).not.toHaveBeenCalled();
        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();
        destroyGlobalState();

        await Messages({ account: 'DEV00000000NI' }).render(containers);

        expect(logger.warn).not.toHaveBeenCalled();
        expect(getMessageComponent()).toHaveBeenCalledTimes(2);
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(2);
        expect(getMessageComponent()().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(2);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        containers.forEach(container => document.body.removeChild(container));
    });

    test('Combines global, inline, and JavaScript options', async () => {
        // Global
        setGlobalState({ config: { account: 'DEV00000000NI' } });
        const container = document.createElement('div');
        // Inline
        container.setAttribute('data-pp-amount', 100); // Highest priority
        container.setAttribute('data-pp-style-layout', 'flex');
        document.body.appendChild(container);

        // JavaScript
        await Messages({ currency: 'USD', amount: 200 }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                account: 'DEV00000000NI',
                amount: '100',
                currency: 'USD',
                style: {
                    layout: 'flex'
                }
            })
        );
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
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

    test('Calls updateProps on re-render', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        await Messages({ account: 'DEV00000000NI' }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().updateProps).not.toHaveBeenCalled();
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();

        clearMocks();

        await Messages({ account: 'DEV00000000NI' }).render(container);

        expect(getMessageComponent()).not.toHaveBeenCalled();
        expect(getMessageComponent()().render).not.toHaveBeenCalled();
        expect(getMessageComponent()().updateProps).toHaveBeenCalledTimes(1);
        expect(Modal).toHaveBeenCalledTimes(1);
        expect(Modal().render).not.toHaveBeenCalled();
        expect(Modal().updateProps).not.toHaveBeenCalled();
    });

    test('Default renders to [data-pp-message]', async () => {
        const container = document.createElement('div');
        container.setAttribute('data-pp-message', true);
        document.body.appendChild(container);

        await Messages({}).render();

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().render).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()().render).toHaveBeenLastCalledWith(container);
    });

    test('Passes onRender handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onRender = jest.fn();

        await Messages({ onRender }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onReady: expect.any(Function)
            })
        );
        expect(onRender).not.toHaveBeenCalled();

        const [[{ onReady: onReadyHandler }]] = getMessageComponent().mock.calls;

        onReadyHandler({ meta: { messageRequestId: '12345', trackingDetails: {} } });

        expect(onRender).toHaveBeenCalledTimes(1);
        expect(onRender).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345', trackingDetails: {} } });
    });

    test('Passes onClick handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onClick = jest.fn();

        await Messages({ onClick }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onClick: expect.any(Function)
            })
        );
        expect(onClick).not.toHaveBeenCalled();

        const [[{ onClick: onClickHandler }]] = getMessageComponent().mock.calls;

        onClickHandler({ meta: { messageRequestId: '12345' } });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345' } });
    });

    it.skip('Passes onHover handler', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onHover = jest.fn();

        await Messages({ onHover }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onHover: expect.any(Function)
            })
        );

        const [[{ onHover: onHoverHandler }]] = getMessageComponent().mock.calls;

        onHoverHandler({ meta: { messageRequestId: '12345' } });

        expect(onHover).toHaveBeenCalledTimes(1);
        expect(onHover).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345' } });
    });

    // The Message component does not use the onApply function that the client attaches,
    // but it does need to be able to accept a function for onApply so it can be passed
    // on to the Modal component
    test('Passes onApply handler on message', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const onApply = jest.fn();

        await Messages({ onApply }).render(container);

        expect(getMessageComponent()).toHaveBeenCalledTimes(1);
        expect(getMessageComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onApply: expect.any(Function)
            })
        );
        expect(onApply).not.toHaveBeenCalled();

        const [[{ onApply: onApplyHandler }]] = getMessageComponent().mock.calls;

        onApplyHandler({ meta: { messageRequestId: '12345' } });

        expect(onApply).toHaveBeenCalledTimes(1);
        expect(onApply).toHaveBeenLastCalledWith({ meta: { messageRequestId: '12345' } });
    });
});
