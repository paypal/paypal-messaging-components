/** @jsx h */
import { h } from 'preact';
import { renderHook, act } from '@testing-library/preact-hooks';
import { ServerDataProvider, useServerData } from 'src/components/modal/v1/lib/providers/serverData';

describe('serverData', () => {
    test('useServerData can access and update ServerDataProvider', () => {
        const wrapper = ({ children }) => (
            <ServerDataProvider data={{ markup: 'test-markup', meta: 'test-meta' }}>{children}</ServerDataProvider>
        );
        const { result } = renderHook(
            () => {
                const { markup, meta, setServerData } = useServerData();

                return { markup, meta, setServerData };
            },
            { wrapper }
        );

        expect(result.current.markup).toBe('test-markup');
        expect(result.current.meta).toBe('test-meta');

        act(() => {
            result.current.setServerData({ markup: 'test-markup-2', meta: 'test-meta-2' });
        });

        expect(result.current.markup).toBe('test-markup-2');
        expect(result.current.meta).toBe('test-meta-2');
    });
});
