/** @jsx h */
import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';
import { render, act } from '@testing-library/preact';

import { useTransitionState } from '@components/modal/lib/providers/transition';
import { getContent } from '@components/modal/lib/utils';
import Container from '@components/modal/parts/Container';
import xPropsMock from '@tests/utils/xPropsMock';
import zoidComponentWrapper from '@tests/utils/zoidComponentWrapper';

const mockTransitionContext = createContext(['CLOSED']);
jest.mock('@components/modal/lib/logos', () => ({}));
jest.mock('@components/modal/lib/providers/transition', () => ({
    useTransitionState: jest.fn()
}));

jest.mock('@components/modal/lib/utils', () => ({
    getContent: jest.fn().mockResolvedValue(null)
}));

describe('<Container />', () => {
    const product = 'product';

    useTransitionState.mockImplementation(() => useContext(mockTransitionContext));

    const contentWrapper = {
        current: document.createElement('div')
    };

    const updateProps = xPropsMock({
        onReady: jest.fn()
    });

    const wrapper = zoidComponentWrapper({
        products: [
            {
                meta: {
                    product
                }
            }
        ],
        meta: {
            trackingDetails: {}
        }
    });

    const content = (
        <Container contentWrapper={contentWrapper}>
            <span>modal</span>
        </Container>
    );

    test('renders modal content', () => {
        const { queryByText } = render(content, { wrapper });

        expect(queryByText('modal')).not.toBeNull();
        expect(window.xprops.onReady).toHaveBeenCalledWith(
            expect.objectContaining({
                products: [product]
            })
        );
    });

    test('scrolls to top when opening', () => {
        window.focus = jest.fn();
        const { rerender } = render(
            <mockTransitionContext.Provider value={['CLOSED']}>{content}</mockTransitionContext.Provider>,
            { wrapper }
        );

        contentWrapper.current.scrollTop = 20;

        rerender(<mockTransitionContext.Provider value={['OPENING']}>{content}</mockTransitionContext.Provider>);

        expect(window.focus).toHaveBeenCalled();
        expect(contentWrapper.current.scrollTop).toBe(0);
    });

    test('updates content when props change', async () => {
        const { rerender } = render(content, { wrapper });

        Object.entries({
            currency: 'USD',
            amount: 100,
            payerId: '1',
            clientId: '2',
            merchantId: '3'
        }).forEach(([k, v]) => {
            // Confirm that getContent gets called for any prop change
            getContent.mockClear();

            act(() => {
                updateProps({
                    [k]: v
                });
            });
            rerender(content);

            expect(getContent).toHaveBeenCalled();
        });
    });
});
