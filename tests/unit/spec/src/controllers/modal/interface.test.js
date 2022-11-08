import Modal from 'src/library/controllers/modal/interface';
import { getModalComponent } from 'src/library/zoid/modal';
import { logger } from 'src/utils';

jest.mock('src/library/zoid/modal', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());
    const mockHide = jest.fn(() => Promise.resolve());
    const mockTrigger = jest.fn();
    const mockCreateModal = jest.fn(() => ({
        render: mockRender,
        updateProps: mockUpdateProps,
        hide: mockHide,
        state: {},
        event: {
            trigger: mockTrigger,
            once: (_, resolve) => resolve()
        }
    }));

    return {
        getModalComponent: () => mockCreateModal
    };
});

jest.mock('src/utils/logger', () => ({
    logger: {
        warn: jest.fn(),
        track: jest.fn(),
        info: jest.fn()
    }
}));

const clearMocks = () => {
    logger.track.mockClear();

    getModalComponent()().render.mockClear();
    getModalComponent()().updateProps.mockClear();
    getModalComponent()().hide.mockClear();
    getModalComponent()().event.trigger.mockClear();
    getModalComponent().mockClear();
};

describe('modal interface', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        clearMocks();
    });

    test('Default renders to body', async () => {
        await Modal({ account: '1' }).render();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenLastCalledWith('body', 'iframe');
    });

    test('Renders a hidden modal', async () => {
        await Modal({ account: '2' }).render();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(0);
        expect(getModalComponent()().event.trigger).toHaveBeenCalledTimes(0);
    });

    test('Default renders to body when attempting to show', async () => {
        await Modal({ account: '3' }).show();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenLastCalledWith('body', 'iframe');
        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenLastCalledWith('modal-show');
    });

    test('Default renders to body when attempting to hide', async () => {
        await Modal({ account: '4' }).hide();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenLastCalledWith('body', 'iframe');
        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(0);
    });

    test('Opens modal', async () => {
        await Modal({ account: '5' }).show({ index: '1' });

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(1);
        // Sends open event to zoid iframe
        expect(getModalComponent()().updateProps).toHaveBeenLastCalledWith({
            index: '1'
        });
        expect(getModalComponent()().event.trigger).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenLastCalledWith('modal-show');
    });

    test('Closes modal', async () => {
        const modal = Modal({ account: '6' });

        await modal.show();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().render).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenLastCalledWith('modal-show');

        await modal.hide();

        expect(getModalComponent()().updateProps).toHaveBeenCalledTimes(1);
        expect(getModalComponent()().event.trigger).toHaveBeenCalledTimes(2);
        expect(getModalComponent()().event.trigger).toHaveBeenLastCalledWith('modal-hide');
    });

    test('Shares a common modal instance', async () => {
        const modal = Modal({ account: '7' });

        expect(modal).toBe(Modal({ account: '7' }));
        expect(modal).not.toBe(Modal({ account: '8' }));
    });

    test('Passes onReady handler', async () => {
        const onReady = jest.fn();
        await Modal({ account: '9', index: '1', onReady }).render();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onReady: expect.any(Function)
            })
        );
        expect(onReady).not.toHaveBeenCalled();

        const [[{ onReady: onReadyHandler }]] = getModalComponent().mock.calls;

        onReadyHandler({ products: ['NI'] });

        expect(onReady).toHaveBeenCalledTimes(1);
        expect(onReady).toHaveBeenLastCalledWith({ products: ['NI'] });
    });

    test('Passes onCalculate handler', async () => {
        const onCalculate = jest.fn();
        await Modal({ account: '10', index: '1', onCalculate }).render();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onCalculate: expect.any(Function)
            })
        );
        expect(onCalculate).not.toHaveBeenCalled();

        const [[{ onCalculate: onCalculateHandler }]] = getModalComponent().mock.calls;

        onCalculateHandler({ value: 100 });

        expect(onCalculate).toHaveBeenCalledTimes(1);
        expect(onCalculate).toHaveBeenLastCalledWith({ value: 100 });
    });

    test('Passes onApply handler on modal', async () => {
        const onApply = jest.fn();
        await Modal({ account: '11', index: '1', onApply }).render();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onApply: expect.any(Function)
            })
        );
        expect(onApply).not.toHaveBeenCalled();

        const [[{ onApply: onApplyHandler }]] = getModalComponent().mock.calls;

        onApplyHandler();

        expect(onApply).toHaveBeenCalledTimes(1);
    });

    test('Passes onClose handler', async () => {
        const onClose = jest.fn();
        const modal = Modal({ account: '12', index: '1', onClose });

        await modal.render();
        await modal.show();

        expect(getModalComponent()).toHaveBeenCalledTimes(1);
        expect(getModalComponent()).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onClose: expect.any(Function)
            })
        );
        expect(onClose).not.toHaveBeenCalled();

        const [[{ onClose: onCloseHandler }]] = getModalComponent().mock.calls;

        onCloseHandler({ linkName: 'Close Button' });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenLastCalledWith({ linkName: 'Close Button' });
    });
});
