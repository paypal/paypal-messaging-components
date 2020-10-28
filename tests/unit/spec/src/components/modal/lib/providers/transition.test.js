/** @jsx h */
import { h } from 'preact';
import { renderHook, act } from '@testing-library/preact-hooks';
import { useXProps } from 'src/components/lib/providers/xprops';
import { TransitionStateProvider, useTransitionState, STATUS } from 'src/components/modal/lib/providers/transition';

const defaultXProps = {
    show: jest.fn().mockResolvedValue(null),
    hide: jest.fn().mockResolvedValue(null),
    onProps: jest.fn(),
    onClose: jest.fn()
};

jest.mock('src/components/lib/providers/xprops');

describe('transition', () => {
    useXProps.mockReturnValue(defaultXProps);

    afterEach(() => {
        defaultXProps.onProps.mockClear();
    });

    test('useTransitionState updates when modal opens and can trigger closing', async () => {
        const wrapper = ({ children }) => <TransitionStateProvider>{children}</TransitionStateProvider>;
        const { result } = renderHook(
            () => {
                const [status, handleClose] = useTransitionState();

                return { status, handleClose };
            },
            { wrapper }
        );

        expect(result.current.status).toBe(STATUS.CLOSED);

        const [onProps] = defaultXProps.onProps.mock.calls[0];

        onProps({ visible: true });

        await new Promise(resolve => {
            setTimeout(() => {
                expect(result.current.status).toBe(STATUS.OPENING);

                setTimeout(() => {
                    expect(result.current.status).toBe(STATUS.OPEN);

                    resolve();
                }, 500);
            }, 100);
        });

        const linkName = 'linkName';
        act(() => {
            result.current.handleClose(linkName);
        });

        await new Promise(resolve => {
            setTimeout(() => {
                expect(result.current.status).toBe(STATUS.CLOSING);

                setTimeout(() => {
                    expect(result.current.status).toBe(STATUS.CLOSED);

                    resolve();
                }, 500);
            }, 100);
        });

        // onClose handler should be called with the linkName of the method of closing (x button, overlay, etc)
        expect(defaultXProps.onClose).toHaveBeenCalledWith({ linkName });
    });
});
