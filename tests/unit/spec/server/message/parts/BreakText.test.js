/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import BreakText from 'server/message/parts/BreakText';

describe('<BreakText />', () => {
    const textParts = [['No Interest if paid in full in 6 months'], ['on purchases of $99+.', 'weak']];

    test('handles breaks in the middle of text', () => {
        const { getByText } = render(<BreakText textParts={textParts} options={{ tag: 'small', br: ['paid'] }} />);

        expect(getByText('No Interest if paid')).toBeInTheDocument();
        expect(getByText('No Interest if paid')).toHaveClass('br');
        expect(getByText('in full in 6 months')).toBeInTheDocument();
        expect(getByText('in full in 6 months')).toHaveClass('br');
        expect(getByText('on purchases of $99+.')).toBeInTheDocument();
        expect(getByText('on purchases of $99+.')).toHaveClass('weak');
    });

    test('does not nest if break is at end of text', () => {
        const { getByText } = render(<BreakText textParts={textParts} options={{ tag: 'small', br: ['months'] }} />);

        expect(getByText('No Interest if paid in full in 6 months')).toBeInTheDocument();
        expect(getByText('No Interest if paid in full in 6 months')).toHaveClass('br');
        expect(getByText('No Interest if paid in full in 6 months').parentElement).not.toHaveClass('br');
    });
});
