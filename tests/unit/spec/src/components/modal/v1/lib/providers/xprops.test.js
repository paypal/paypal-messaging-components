/** @jsx h */
import { h } from 'preact';
import { renderHook, act } from '@testing-library/preact-hooks';
import { XPropsProvider, useXProps } from 'src/components/modal/v1/lib/providers/xprops';

import xPropsMock from 'utils/xPropsMock';

describe('xprops', () => {
    test('useXProps can access XPropsProvider and receives updates', () => {
        const updateProps = xPropsMock({ payerId: 'DEV00000000NI', amount: 100 });
        const wrapper = ({ children }) => <XPropsProvider>{children}</XPropsProvider>;
        const { result } = renderHook(
            () => {
                const { payerId, amount } = useXProps();

                return { payerId, amount };
            },
            { wrapper }
        );

        expect(result.current.payerId).toBe('DEV00000000NI');
        expect(result.current.amount).toBe(100);

        act(() => {
            updateProps({ amount: 200 });
        });

        expect(result.current.payerId).toBe('DEV00000000NI');
        expect(result.current.amount).toBe(200);
    });
});
