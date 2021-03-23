import Modal from '@library/controllers/modal/interface';
import { Modal as zoidModal } from '@library/zoid/modal';
import { logger } from '@library/common';

jest.mock('@library/zoid/modal', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());
    const mockHide = jest.fn(() => Promise.resolve());

    return {
        Modal: jest.fn(() => ({
            render: mockRender,
            updateProps: mockUpdateProps,
            hide: mockHide,
            state: {},
            event: {
                once: (_, resolve) => resolve()
            }
        }))
    };
});

jest.mock('@library/common/logger', () => ({
    logger: {
        warn: jest.fn(),
        track: jest.fn(),
        info: jest.fn()
    }
}));

const clearMocks = () => {
    logger.track.mockClear();

    zoidModal().render.mockClear();
    zoidModal().updateProps.mockClear();
    zoidModal().hide.mockClear();
    zoidModal.mockClear();
};

describe('modal interface', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        clearMocks();
    });

    test('Default renders to body', async () => {
        await Modal({ account: '1' }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
    });

    test('Renders a hidden modal', async () => {
        await Modal({ account: '2' }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(0);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    test('Default renders to body when attempting to show', async () => {
        await Modal({ account: '3' }).show();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    test('Default renders to body when attempting to hide', async () => {
        await Modal({ account: '4' }).hide();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    test('Opens modal', async () => {
        await Modal({ account: '5' }).show({ index: '1' });

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        // Sends open event to zoid iframe
        expect(zoidModal().updateProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                visible: true
            })
        );
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    test('Closes modal', async () => {
        const modal = Modal({ account: '6' });

        await modal.show();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);

        await modal.hide();

        expect(zoidModal().updateProps).toHaveBeenCalledTimes(2);
        expect(zoidModal().updateProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                visible: false
            })
        );
    });

    test('Shares a common modal instance', async () => {
        const modal = Modal({ account: '7' });

        expect(modal).toBe(Modal({ account: '7' }));
        expect(modal).not.toBe(Modal({ account: '8' }));
    });

    test('Passes onReady handler', async () => {
        const onReady = jest.fn();
        await Modal({ account: '9', index: '1', onReady }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onReady: expect.any(Function)
            })
        );
        expect(onReady).not.toHaveBeenCalled();

        const [[{ onReady: onReadyHandler }]] = zoidModal.mock.calls;

        onReadyHandler({ products: ['NI'] });

        expect(onReady).toHaveBeenCalledTimes(1);
        expect(onReady).toHaveBeenLastCalledWith({ products: ['NI'] });
    });

    test('Passes onCalculate handler', async () => {
        const onCalculate = jest.fn();
        await Modal({ account: '10', index: '1', onCalculate }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onCalculate: expect.any(Function)
            })
        );
        expect(onCalculate).not.toHaveBeenCalled();

        const [[{ onCalculate: onCalculateHandler }]] = zoidModal.mock.calls;

        onCalculateHandler({ value: 100 });

        expect(onCalculate).toHaveBeenCalledTimes(1);
        expect(onCalculate).toHaveBeenLastCalledWith({ value: 100 });
    });

    test('Passes onApply handler', async () => {
        const onApply = jest.fn();
        await Modal({ account: '11', index: '1', onApply }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onApply: expect.any(Function)
            })
        );
        expect(onApply).not.toHaveBeenCalled();

        const [[{ onApply: onApplyHandler }]] = zoidModal.mock.calls;

        onApplyHandler();

        expect(onApply).toHaveBeenCalledTimes(1);
    });

    test('Passes onClose handler', async () => {
        const onClose = jest.fn();
        const modal = Modal({ account: '12', index: '1', onClose });

        await modal.render();
        await modal.show();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal).toHaveBeenLastCalledWith(
            expect.objectContaining({
                onClose: expect.any(Function)
            })
        );
        expect(onClose).not.toHaveBeenCalled();

        const [[{ onClose: onCloseHandler }]] = zoidModal.mock.calls;

        onCloseHandler({ linkName: 'Close Button' });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenLastCalledWith({ linkName: 'Close Button' });
    });
});
