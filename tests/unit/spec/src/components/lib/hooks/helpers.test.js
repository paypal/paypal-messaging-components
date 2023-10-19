import { renderHook } from '@testing-library/preact-hooks';
import { useAutoFocus, useDidUpdateEffect } from 'src/components/modal/v1/lib/hooks/helpers';

describe('hooks helpers', () => {
    describe('useAutoFocus', () => {
        test('Auto focuses the returned ref', () => {
            const button = document.createElement('button');
            button.focus = jest.fn();
            const { rerender } = renderHook(() => {
                const focustRef = useAutoFocus();
                focustRef.current = button;
            });

            expect(button.focus).toHaveBeenCalledTimes(1);

            rerender();

            expect(button.focus).toHaveBeenCalledTimes(2);
        });
    });

    describe('useDidUpdateEffect', () => {
        test('Runs effect function only when dependencies update', () => {
            const effectFn = jest.fn();
            const { rerender } = renderHook(
                ({ dependencies }) => {
                    useDidUpdateEffect(effectFn, dependencies);
                },
                { initialProps: { dependencies: ['a', 1] } }
            );

            expect(effectFn).not.toHaveBeenCalled();

            rerender({ dependencies: ['b', 1] });

            expect(effectFn).toHaveBeenCalledTimes(1);

            rerender({ dependencies: ['b', 1] });

            expect(effectFn).toHaveBeenCalledTimes(1);

            rerender({ dependencies: ['b', 2] });

            expect(effectFn).toHaveBeenCalledTimes(2);
        });
    });
});
