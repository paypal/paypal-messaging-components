/** @jsx h */
import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';
import { render, fireEvent } from '@testing-library/preact';

import zoidComponentWrapper from 'utils/zoidComponentWrapper';
import Tabs from 'src/components/modal/v1/parts/Tabs';
import xPropsMock from 'utils/xPropsMock';
import { useScroll } from 'src/components/modal/v1/lib';
import { useTransitionState } from 'src/components/modal/v1/lib/providers/transition';

const mockTransitionContext = createContext([]);
jest.mock('src/components/modal/v1/lib/logos', () => ({}));

jest.mock('src/components/modal/v1/lib/providers/transition', () => ({
    useTransitionState: jest.fn()
}));

jest.mock('src/components/modal/v1/lib/providers/scroll', () => ({
    useScroll: jest.fn()
}));

describe('<Tabs />', () => {
    const onClick = jest.fn();
    xPropsMock({
        onClick,
        offer: 'PAYPAL_CREDIT_INSTALLMENTS'
    });

    useTransitionState.mockImplementation(() => useContext(mockTransitionContext));

    const tabContent = [
        {
            product: 'NI',
            title: 'tab 1',
            header: 'header 1',
            body: 'body 1'
        },
        {
            product: 'EZP',
            title: 'tab 2',
            header: 'header 2',
            body: 'body 2'
        }
    ];

    const wrapper = zoidComponentWrapper();

    const content = <Tabs tabs={tabContent} />;

    beforeEach(() => {
        onClick.mockClear();
        useScroll.mockReturnValue({
            scrollTo: () => {}
        });
    });

    test('displays tab content', () => {
        const { getByText } = render(content, { wrapper });
        expect(getByText(tabContent[1].header)).toHaveClass('selected');
        expect(getByText(tabContent[1].body)).toHaveClass('selected');
        expect(getByText(tabContent[1].title).closest('button')).toHaveClass('selected');
        expect(getByText(tabContent[0].header)).not.toHaveClass('selected');
        expect(getByText(tabContent[0].body)).not.toHaveClass('selected');
        expect(getByText(tabContent[0].title).closest('button')).not.toHaveClass('selected');
    });

    test('scrolls to top on tab switch', () => {
        const scrollTo = jest.fn();
        useScroll.mockReturnValue({
            scrollTo
        });

        const { getByText } = render(content, { wrapper });
        const tab1 = getByText(tabContent[0].title);

        fireEvent.click(tab1);

        expect(getByText(tabContent[0].header)).toHaveClass('selected');
        expect(getByText(tabContent[0].body)).toHaveClass('selected');
        expect(getByText(tabContent[0].title).closest('button')).toHaveClass('selected');
        expect(getByText(tabContent[1].header)).not.toHaveClass('selected');
        expect(getByText(tabContent[1].body)).not.toHaveClass('selected');
        expect(getByText(tabContent[1].title).closest('button')).not.toHaveClass('selected');

        expect(scrollTo).toHaveBeenCalledWith(0);
        expect(onClick).toHaveBeenCalledWith({
            linkName: tabContent[0].product,
            src: 'tab_click'
        });
    });

    test('selects initial tab on close', async () => {
        const { getByText, rerender } = render(
            <mockTransitionContext.Provider value={['OPEN']}>{content}</mockTransitionContext.Provider>,
            { wrapper }
        );
        const tab1 = getByText(tabContent[0].title);

        fireEvent.click(tab1);

        rerender(<mockTransitionContext.Provider value={['CLOSED']}>{content}</mockTransitionContext.Provider>);

        expect(getByText(tabContent[1].header)).toHaveClass('selected');
    });
});
