import { renderHook } from '@testing-library/preact-hooks';
import { useProduct, useContent, useProductMeta } from 'src/components/modal/v2/lib/hooks/content';
import * as providers from 'src/components/modal/v2/lib/providers';

jest.mock('src/components/modal/v2/lib/providers');

describe('modal/v2/lib/hooks/content', () => {
    describe('useProduct', () => {
        test('returns product data when views is an array and product is found', () => {
            const mockViews = [
                { meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } },
                { meta: { product: 'PRODUCT_B' }, content: { title: 'Product B' } }
            ];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useProduct('PRODUCT_A'));

            expect(result.current).toEqual({ meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } });
        });

        test('returns empty content when views is an array but product is not found', () => {
            const mockViews = [
                { meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } },
                { meta: { product: 'PRODUCT_B' }, content: { title: 'Product B' } }
            ];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useProduct('PRODUCT_C'));

            expect(result.current).toEqual({ content: {} });
        });

        test('returns empty content when views is not an array', () => {
            providers.useServerData.mockReturnValue({ views: null });

            const { result: resultNull } = renderHook(() => useProduct('PRODUCT_A'));
            expect(resultNull.current).toEqual({ content: {} });

            providers.useServerData.mockReturnValue({ views: undefined });

            const { result: resultUndefined } = renderHook(() => useProduct('PRODUCT_A'));
            expect(resultUndefined.current).toEqual({ content: {} });

            providers.useServerData.mockReturnValue({ views: {} });

            const { result: resultObject } = renderHook(() => useProduct('PRODUCT_A'));
            expect(resultObject.current).toEqual({ content: {} });

            providers.useServerData.mockReturnValue({ views: 'not an array' });

            const { result: resultString } = renderHook(() => useProduct('PRODUCT_A'));
            expect(resultString.current).toEqual({ content: {} });
        });

        test('returns empty content when views is an empty array', () => {
            providers.useServerData.mockReturnValue({ views: [] });

            const { result } = renderHook(() => useProduct('PRODUCT_A'));

            expect(result.current).toEqual({ content: {} });
        });
    });

    describe('useContent', () => {
        test('returns content from product', () => {
            const mockViews = [{ meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } }];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useContent('PRODUCT_A'));

            expect(result.current).toEqual({ title: 'Product A' });
        });

        test('returns empty object when product is not found', () => {
            const mockViews = [{ meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } }];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useContent('PRODUCT_B'));

            expect(result.current).toEqual({});
        });
    });

    describe('useProductMeta', () => {
        test('returns meta from product', () => {
            const mockViews = [{ meta: { product: 'PRODUCT_A', version: '1.0' }, content: { title: 'Product A' } }];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useProductMeta('PRODUCT_A'));

            expect(result.current).toEqual({ product: 'PRODUCT_A', version: '1.0' });
        });

        test('returns undefined when product is not found', () => {
            const mockViews = [{ meta: { product: 'PRODUCT_A' }, content: { title: 'Product A' } }];

            providers.useServerData.mockReturnValue({ views: mockViews });

            const { result } = renderHook(() => useProductMeta('PRODUCT_B'));

            expect(result.current).toBeUndefined();
        });
    });
});
