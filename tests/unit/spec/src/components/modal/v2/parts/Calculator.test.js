/** @jsx h */
import { h } from 'preact';
import { fireEvent, render, screen } from '@testing-library/preact';

import Calculator from 'src/components/modal/v2/parts/Calculator';

const mockUseCalculator = jest.fn();
const mockUseXProps = jest.fn();

jest.mock('src/components/modal/v2/lib', () => ({
    useCalculator: (...args) => mockUseCalculator(...args),
    useServerData: () => ({ country: 'US', views: [{ meta: { language: 'en' } }] }),
    useXProps: () => mockUseXProps(),
    delocalize: value => value,
    getDisplayValue: value => value,
    getComputedVariables: () => ({
        minAmount: 49,
        maxAmount: 10000,
        content: {
            calculator: {
                belowThreshold: 'Enter an amount of at least $49.',
                aboveThreshold: 'Enter an amount below $10,000.'
            }
        }
    }),
    currencyFormat: value => value
}));

jest.mock('src/components/modal/v2/parts/TermsTable', () => () => null);

const calculator = {
    title: 'How much is your purchase?',
    genericTitle: 'How much is your purchase?',
    inputLabel: 'Purchase amount',
    inputPlaceholder: 'Enter amount',
    genericError: 'Something went wrong. Please try again.'
};
const defaultCalculatorState = {
    view: { offers: [{ meta: { qualifying: 'true' } }] },
    value: '',
    isLoading: false,
    submit: jest.fn(),
    changeInput: jest.fn()
};

const renderCalculator = (calculatorOverrides = {}) =>
    render(
        <Calculator
            setExpandedState={jest.fn()}
            calculator={{ ...calculator, ...calculatorOverrides }}
            aprDisclaimer={{ default: { aprDisclaimer: 'Terms apply.' } }}
        />
    );

describe('Calculator amount field accessibility', () => {
    beforeEach(() => {
        mockUseCalculator.mockReturnValue(defaultCalculatorState);
        mockUseXProps.mockReturnValue({ amount: undefined });
    });

    test('uses the visible placeholder as the accessible name for an empty US amount', () => {
        renderCalculator();

        const input = screen.getByRole('textbox', { name: 'Enter amount' });

        expect(input).toHaveAttribute('placeholder', 'Enter amount');
        expect(input).not.toHaveAttribute('aria-invalid');
    });

    test('uses the visible label as the accessible name for a populated US amount', () => {
        mockUseCalculator.mockReturnValue({
            ...defaultCalculatorState,
            value: '100'
        });
        mockUseXProps.mockReturnValue({ amount: 100 });

        renderCalculator();

        expect(screen.getByText('Purchase amount')).toBeVisible();
        expect(screen.getByRole('textbox', { name: 'Purchase amount' })).toHaveValue('100');
    });

    test('associates an invalid populated amount with its single live error message', () => {
        mockUseCalculator.mockReturnValue({
            ...defaultCalculatorState,
            value: '25'
        });
        mockUseXProps.mockReturnValue({ amount: 25 });

        const { container } = renderCalculator();
        const input = screen.getByRole('textbox', { name: 'Purchase amount' });
        const error = screen.getByText('Enter an amount of at least $49.');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', 'purchase-amount-error');
        expect(error).toHaveAttribute('id', 'purchase-amount-error');
        expect(container.querySelectorAll('[aria-live="polite"]')).toHaveLength(1);
        expect(error.previousElementSibling).toHaveAttribute('aria-hidden', 'true');
    });

    test('associates an initial zero amount with its error message', () => {
        mockUseCalculator.mockReturnValue({
            ...defaultCalculatorState,
            value: '0'
        });
        mockUseXProps.mockReturnValue({ amount: 0 });

        const { container } = renderCalculator();

        const input = screen.getByRole('textbox', { name: 'Purchase amount' });
        const error = screen.getByText('Enter an amount of at least $49.');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', error.id);
        expect(container.querySelector('.input__wrapper')).not.toHaveClass('input__wrapper--error');
        expect(error.previousElementSibling).toBeNull();
    });

    test('associates a cleared amount with its error after the field has been used', () => {
        const { container } = renderCalculator();

        const input = screen.getByRole('textbox', { name: 'Enter amount' });
        fireEvent.input(input, { target: { value: '' } });

        const error = screen.getByText('Enter an amount of at least $49.');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', error.id);
        expect(container.querySelector('.input__wrapper')).not.toHaveClass('input__wrapper--error');
        expect(error.previousElementSibling).toBeNull();
    });

    test('announces a service failure without marking a valid amount as invalid', () => {
        mockUseCalculator.mockReturnValue({
            ...defaultCalculatorState,
            view: { error: 'request failed', offers: [] },
            value: '100'
        });
        mockUseXProps.mockReturnValue({ amount: 100 });

        renderCalculator();

        const input = screen.getByRole('textbox', { name: 'Purchase amount' });
        const error = screen.getByText('Something went wrong. Please try again.');

        expect(input).not.toHaveAttribute('aria-invalid');
        expect(input).not.toHaveAttribute('aria-describedby');
        expect(error).not.toHaveAttribute('id');
        expect(error.closest('[aria-live="polite"]')).toBeInTheDocument();
    });
});

describe('Calculator loading announcement', () => {
    beforeEach(() => {
        mockUseCalculator.mockReturnValue({
            ...defaultCalculatorState,
            value: '100',
            isLoading: true
        });
        mockUseXProps.mockReturnValue({ amount: 100 });
    });

    test.each([
        ['the English fallback', undefined, 'Loading financing options'],
        ['localized content', 'Finanzierungsoptionen werden geladen', 'Finanzierungsoptionen werden geladen']
    ])('uses %s', (_, loadingLabel, expectedLabel) => {
        const { container } = renderCalculator({ loadingLabel });

        expect(screen.getByRole('status')).toHaveTextContent(expectedLabel);
        expect(container.querySelector('.content-column[aria-live="polite"]')).toHaveAttribute('aria-busy', 'true');
    });
});
