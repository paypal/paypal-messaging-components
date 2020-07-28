import Modal from 'src/controllers/modal/interface';
import { Modal as zoidModal } from 'src/zoid/modal';
import { logger } from 'src/utils';

jest.mock('src/zoid/modal', () => {
    const mockRender = jest.fn(() => Promise.resolve());
    const mockUpdateProps = jest.fn(() => Promise.resolve());
    const mockHide = jest.fn(() => Promise.resolve());

    return {
        Modal: jest.fn(() => ({
            render: mockRender,
            updateProps: mockUpdateProps,
            hide: mockHide
        }))
    };
});

jest.mock('src/utils/logger', () => ({
    logger: {
        warn: jest.fn(),
        track: jest.fn()
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

    it('Default renders to body', async () => {
        await Modal({ account: '1' }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
    });

    it('Renders a hidden modal', async () => {
        await Modal({ account: '2' }).render();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().updateProps).not.toHaveBeenCalled();
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    it('Default renders to body when attempting to show', async () => {
        await Modal({ account: '3' }).show();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    it('Default renders to body when attempting to hide', async () => {
        await Modal({ account: '4' }).hide();

        expect(zoidModal).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenCalledTimes(1);
        expect(zoidModal().render).toHaveBeenLastCalledWith('body');
        expect(zoidModal().updateProps).toHaveBeenCalledTimes(1);
        expect(zoidModal().hide).toHaveBeenCalledTimes(1);
    });

    it('Opens modal', async () => {
        await Modal({ account: '5' }).show({ refId: '12345' });

        const modalViewport = document.head.querySelector('meta[name="viewport"]');

        // Adds viewport
        expect(modalViewport).not.toBeNull();
        expect(modalViewport.getAttribute('content')).toBe(
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
        );

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
        expect(logger.track).toHaveBeenCalledTimes(1);
        // Tracks modal open event
        expect(logger.track).toHaveBeenLastCalledWith(
            expect.objectContaining({
                message_request_id: '12345',
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-open'
            })
        );
    });

    it('Closes modal', async () => {
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
});
