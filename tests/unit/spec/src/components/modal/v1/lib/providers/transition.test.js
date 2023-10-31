/** @jsx h */
import { h } from 'preact';
import { renderHook, act } from '@testing-library/preact-hooks';
import { useXProps } from 'src/components/modal/v1/lib/providers/xprops';
import { TransitionStateProvider, useTransitionState, STATUS } from 'src/components/modal/v1/lib/providers/transition';

const defaultXProps = {
    show: jest.fn().mockResolvedValue(null),
    hide: jest.fn().mockResolvedValue(null),
    onProps: jest.fn(),
    onClose: jest.fn(),
    onShow: jest.fn()
};

jest.mock('src/components/modal/v1/lib/providers/xprops');

describe('transition', () => {
    useXProps.mockReturnValue(defaultXProps);

    test('useTransitionState can trigger modal close', async () => {
        const wrapper = ({ children }) => <TransitionStateProvider>{children}</TransitionStateProvider>;
        const { result } = renderHook(
            () => {
                const [status, handleClose] = useTransitionState();

                return { status, handleClose };
            },
            { wrapper }
        );

        expect(result.current.status).toBe(STATUS.OPEN);

        const linkName = 'linkName';

        act(() => {
            result.current.handleClose(linkName);
        });

        expect(defaultXProps.onClose).toHaveBeenCalledTimes(1);
        // onClose handler should be called with the linkName of the method of closing (x button, overlay, etc)
        expect(defaultXProps.onClose).toHaveBeenLastCalledWith({ linkName });
    });
});
