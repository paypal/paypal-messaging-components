/** @jsx h */
import fs from 'fs';
import path from 'path';
import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import BodyContent from 'src/components/modal/v2/parts/BodyContent';
import {
    useContent,
    useServerData,
    useProductMeta,
    useXProps,
    useScroll,
    useTransitionState,
    useDisclosureView
} from 'src/components/modal/v2/lib';

jest.mock('src/components/modal/v2/lib', () => ({
    useContent: jest.fn(),
    useServerData: jest.fn(),
    useProductMeta: jest.fn(),
    useXProps: jest.fn(),
    useScroll: jest.fn(),
    useTransitionState: jest.fn(),
    useDisclosureView: jest.fn(),
    useDidUpdateEffect: jest.fn(),
    usePrefersDarkMode: jest.fn(),
    isLander: false
}));

jest.mock('src/components/modal/v2/parts/views', () => {
    const { h: createElement } = jest.requireActual('preact');

    return Object.fromEntries(
        ['LongTerm', 'ShortTerm', 'NoInterest', 'ProductList', 'PayIn1'].map(viewName => [
            viewName,
            ({ content, setViewName }) =>
                createElement(
                    'div',
                    { 'data-testid': viewName },
                    content.headline,
                    setViewName &&
                        createElement(
                            'button',
                            { type: 'button', onClick: () => setViewName('PAY_LATER_SHORT_TERM') },
                            'Pay in 4 tile'
                        )
                )
        ])
    );
});
jest.mock('src/components/modal/v2/parts/Header', () => {
    const { h: createElement } = jest.requireActual('preact');

    return () => createElement('button', { type: 'button', id: 'close-btn' }, 'Close');
});
jest.mock('src/components/modal/v2/parts/CheckoutHeader', () => () => null);
jest.mock('src/components/modal/v2/parts/Disclosure', () => () => null);

/**
 * Returns every JSON file below a directory.
 * @param {String} directory Directory to scan.
 * @returns {Array<String>} Absolute JSON file paths.
 */
const findJsonFiles = directory =>
    fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return findJsonFiles(entryPath);
        }

        return entry.isFile() && entry.name.endsWith('.json') ? [entryPath] : [];
    });

describe('modal accessibility content', () => {
    const modalContentRoot = path.resolve('content/modals');
    const calculatorContent = findJsonFiles(modalContentRoot)
        .map(filePath => ({ filePath, content: JSON.parse(fs.readFileSync(filePath, 'utf8')) }))
        .filter(({ content }) => content.content?.calculator);

    test('discovers calculator content', () => {
        expect(calculatorContent).not.toHaveLength(0);
    });

    test.each(calculatorContent)('$filePath provides a loading announcement', ({ content }) => {
        expect(content.content.calculator.loadingLabel).toEqual(expect.any(String));
        expect(content.content.calculator.loadingLabel.trim()).not.toHaveLength(0);
    });
});

const buildView = product => ({ meta: { product }, content: { headline: `${product} headline` } });

describe('modal view behavior', () => {
    beforeEach(() => {
        useXProps.mockReturnValue({});
        useScroll.mockReturnValue({ scrollTo: jest.fn() });
        useTransitionState.mockReturnValue(['OPEN']);
        useDisclosureView.mockReturnValue({});
        useContent.mockImplementation(
            product => useServerData().views.find(view => view.meta.product === product).content
        );
        useProductMeta.mockImplementation(
            product => useServerData().views.find(view => view.meta.product === product).meta
        );
    });

    describe('modal view selection', () => {
        test.each([
            [['PAY_LATER_SHORT_TERM'], undefined, 'ShortTerm'],
            [['PRODUCT_LIST', 'PAY_LATER_SHORT_TERM', 'PAY_LATER_LONG_TERM'], undefined, 'ProductList'],
            [['PAY_LATER_LONG_TERM', 'PAY_LATER_SHORT_TERM'], undefined, 'LongTerm'],
            [['PRODUCT_LIST', 'PAY_LATER_SHORT_TERM', 'PAY_LATER_LONG_TERM'], 'PAY_LATER_LONG_TERM', 'LongTerm']
        ])('preserves normal routing for %j with offer %s', (products, offer, expectedComponent) => {
            useXProps.mockReturnValue({ offer });
            useServerData.mockReturnValue({ views: products.map(buildView), country: 'US' });

            const { getByTestId } = render(<BodyContent />);

            expect(getByTestId(expectedComponent)).toBeInTheDocument();
        });
    });

    describe('modal view change focus', () => {
        test('moves focus to the close button before the activated tile unmounts', () => {
            useServerData.mockReturnValue({
                views: ['PRODUCT_LIST', 'PAY_LATER_SHORT_TERM', 'PAY_LATER_LONG_TERM'].map(buildView),
                country: 'US'
            });

            const { getByText, getByTestId } = render(<BodyContent />);
            const tile = getByText('Pay in 4 tile');
            tile.focus();

            const closeBtn = document.querySelector('#close-btn');
            const focusSpy = jest.spyOn(closeBtn, 'focus');
            fireEvent.click(tile);

            expect(focusSpy).toHaveBeenCalled();
            expect(document.activeElement).toBe(closeBtn);
            expect(getByTestId('ShortTerm')).toBeInTheDocument();
        });
    });
});
