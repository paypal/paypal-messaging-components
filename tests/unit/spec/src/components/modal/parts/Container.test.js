/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';
import { XPropsProvider, ServerDataProvider } from 'src/components/lib';
import { useTransitionState } from 'src/components/modal/lib/providers/transition';
import { getContent } from 'src/components/modal/lib/utils';
import xPropsMock from 'utils/xPropsMock';
import Container from 'src/components/modal/parts/Container';
import { act } from 'preact/test-utils';

jest.mock('src/components/modal/lib/logos', () => ({}));
jest.mock('src/components/modal/lib/providers/transition', () => ({
    useTransitionState: jest.fn().mockReturnValue(['CLOSED'])
}));

jest.mock('src/components/modal/lib/utils', () => ({
    getContent: jest.fn().mockResolvedValue(null)
}));

describe('<Container />', () => {
    const product = 'product';
    const contentWrapper = {
        current: document.createElement('div')
    };

    const updateProps = xPropsMock({
        onReady: jest.fn()
    });

    const wrapper = (
        <XPropsProvider>
            <ServerDataProvider
                data={{
                    products: [
                        {
                            meta: {
                                product
                            }
                        }
                    ]
                }}
            >
                <Container contentWrapper={contentWrapper}>
                    <span>modal</span>
                </Container>
            </ServerDataProvider>
        </XPropsProvider>
    );

    test('renders modal content', () => {
        const { queryByText } = render(wrapper);

        expect(queryByText('modal')).not.toBeNull();
        expect(window.xprops.onReady).toHaveBeenCalledWith(
            expect.objectContaining({
                products: [product]
            })
        );
    });

    test('scrolls to top when opening', () => {
        window.focus = jest.fn();
        render(wrapper);

        contentWrapper.current.scrollTop = 20;
        useTransitionState.mockReturnValue(['OPENING']);

        render(wrapper);

        expect(window.focus).toHaveBeenCalled();
        expect(contentWrapper.current.scrollTop).toBe(0);
    });

    test('updates content when props change', async () => {
        render(wrapper);

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
            render(wrapper);

            expect(getContent).toHaveBeenCalled();
        });
    });
});
