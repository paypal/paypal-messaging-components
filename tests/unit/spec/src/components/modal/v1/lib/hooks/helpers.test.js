import { renderHook } from '@testing-library/preact-hooks';
import { useDidUpdateEffect } from 'src/components/modal/v1/lib/hooks/helpers';

describe('hooks helpers', () => {
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
