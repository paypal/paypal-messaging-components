/** @jsx h */
import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';
import { render, act } from '@testing-library/preact';

import { useTransitionState } from 'src/components/modal/v1/lib/providers/transition';
import { getContent } from 'src/components/modal/v1/lib/utils';
import xPropsMock from 'utils/xPropsMock';
import Container from 'src/components/modal/v1/parts/Container';
import zoidComponentWrapper from 'utils/zoidComponentWrapper';

const mockTransitionContext = createContext(['CLOSED']);

jest.mock('src/components/modal/v1/lib/logos', () => ({}));
jest.mock('src/components/modal/v1/lib/providers/transition', () => ({
    useTransitionState: jest.fn()
}));

jest.mock('src/components/modal/v1/lib/utils', () => ({
    getContent: jest.fn().mockResolvedValue(null),
    setupTabTrap: jest.fn().mockResolvedValue(null)
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
        meta: {
            modalRequestId: '12345',
            trackingDetails: {}
        },
        products: [
            {
                meta: {
                    product
                }
            }
        ]
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
                meta: {
                    modalRequestId: '12345',
                    trackingDetails: {}
                },
                products: [product]
            })
        );
    });

    test('scrolls to top when opening', () => {
        contentWrapper.current.scrollTop = 20;

        const { rerender } = render(
            <mockTransitionContext.Provider value={['CLOSED']}>{content}</mockTransitionContext.Provider>,
            { wrapper }
        );

        expect(contentWrapper.current.scrollTop).toBe(0);
        window.requestAnimationFrame(() => {
            expect(window.document.querySelector('#close-btn').focus).not.toHaveBeenCalled();
        });

        rerender(<mockTransitionContext.Provider value={['OPEN']}>{content}</mockTransitionContext.Provider>);

        expect(contentWrapper.current.scrollTop).toBe(0);
        window.requestAnimationFrame(() => {
            expect(window.document.querySelector('#close-btn').focus).toHaveBeenCalled();
        });
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
