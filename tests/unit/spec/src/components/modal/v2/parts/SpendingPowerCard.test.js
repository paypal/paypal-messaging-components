/** @jsx h */
import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';

import SpendingPowerCard from 'src/components/modal/v2/parts/SpendingPowerCard';
import { openPrequalification } from 'src/components/modal/v2/lib/utils';

const mockOnClick = jest.fn();

jest.mock('src/components/modal/v2/lib/utils', () => ({
    ...jest.requireActual('src/components/modal/v2/lib/utils'),
    openPrequalification: jest.fn()
}));

jest.mock('src/components/modal/v2/lib/providers', () => ({
    ...jest.requireActual('src/components/modal/v2/lib/providers'),
    useXProps: () => ({ amount: 600, onClick: mockOnClick })
}));

describe('<SpendingPowerCard />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders content copy', () => {
        const { getByRole, getByText } = render(
            <SpendingPowerCard
                content={{ headline: 'Headline', subtext: 'Subtext', buttonText: 'Button text' }}
                offer="PAY_LATER_LONG_TERM"
            />
        );

        expect(getByRole('heading', { name: 'Headline' })).toBeInTheDocument();
        expect(getByText('Subtext')).toBeInTheDocument();
        expect(getByRole('button')).toHaveTextContent('Button text');
    });

    test('tracks the click and opens prequalification', () => {
        const { getByRole } = render(<SpendingPowerCard offer="PAY_LATER_SHORT_TERM" />);

        fireEvent.click(getByRole('button'));

        expect(mockOnClick).toHaveBeenCalledWith({ linkName: 'Check Spending Power' });
        expect(openPrequalification).toHaveBeenCalledWith({ offer: 'PAY_LATER_SHORT_TERM', amount: 600 });
    });
});
