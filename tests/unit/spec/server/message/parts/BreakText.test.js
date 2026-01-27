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

    test('handles breaks when text occurs multiple times', () => {
        const { getByText } = render(<BreakText textParts={textParts} options={{ tag: 'small', br: ['in'] }} />);

        expect(getByText('No Interest if paid in')).toBeInTheDocument();
        expect(getByText('No Interest if paid in')).toHaveClass('br');
        expect(getByText('No Interest if paid in').parentElement).not.toHaveClass('br');

        expect(getByText('full in 6 months')).toBeInTheDocument();
        expect(getByText('full in 6 months')).toHaveClass('br');
        expect(getByText('full in 6 months').parentElement).not.toHaveClass('br');

        expect(getByText('on purchases of $99+.')).toBeInTheDocument();
        expect(getByText('on purchases of $99+.')).toHaveClass('weak');
    });

    test('can break text multiple times with the same word', () => {
        const { getByText } = render(<BreakText textParts={textParts} options={{ tag: 'small', br: ['in', 'in'] }} />);

        expect(getByText('No Interest if paid in')).toBeInTheDocument();
        expect(getByText('No Interest if paid in')).toHaveClass('br');
        expect(getByText('No Interest if paid in').parentElement).not.toHaveClass('br');

        expect(getByText('full in')).toBeInTheDocument();
        expect(getByText('full in')).toHaveClass('br');
        expect(getByText('full in').parentElement).not.toHaveClass('br');

        expect(getByText('6 months')).toBeInTheDocument();
        expect(getByText('6 months')).toHaveClass('br');
        expect(getByText('6 months').parentElement).not.toHaveClass('br');

        expect(getByText('on purchases of $99+.')).toBeInTheDocument();
        expect(getByText('on purchases of $99+.')).toHaveClass('weak');
    });

    test('can break text multiple times with different words', () => {
        const { getByText } = render(<BreakText textParts={textParts} options={{ tag: 'small', br: ['if', 'in'] }} />);

        expect(getByText('No Interest if')).toBeInTheDocument();
        expect(getByText('No Interest if')).toHaveClass('br');
        expect(getByText('No Interest if').parentElement).not.toHaveClass('br');

        expect(getByText('paid in')).toBeInTheDocument();
        expect(getByText('paid in')).toHaveClass('br');
        expect(getByText('paid in').parentElement).not.toHaveClass('br');

        expect(getByText('full in 6 months')).toBeInTheDocument();
        expect(getByText('full in 6 months')).toHaveClass('br');
        expect(getByText('full in 6 months').parentElement).not.toHaveClass('br');
    });

    test.each(
        [
            { testcase: 'text parts contains null', textParts: [[null, 'weak']], text: '' },
            { testcase: 'text parts contains undefined', textParts: [[undefined, 'weak']], text: '' },
            { testcase: 'text parts contains boolean', textParts: [[true, 'weak']], text: '' },
            { testcase: 'text parts contains number', textParts: [[42, 'weak']], text: '' },
            { testcase: 'text parts contains array', textParts: [[[], 'weak']], text: '' },
            { testcase: 'text parts contains object', textParts: [[{}, 'weak']], text: '' },
            {
                testcase: 'text parts contains string and null',
                textParts: [...textParts, [null, 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            },
            {
                testcase: 'text parts contains string and undefined',
                textParts: [...textParts, [undefined, 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            },
            {
                testcase: 'text parts contains string and boolean',
                textParts: [...textParts, [true, 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            },
            {
                testcase: 'text parts contains string and number',
                textParts: [...textParts, [42, 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            },
            {
                testcase: 'text parts contains string and array',
                textParts: [...textParts, [[], 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            },
            {
                testcase: 'text parts contains string and object',
                textParts: [...textParts, [{}, 'weak']],
                text: 'No Interest if paid in full in 6 months on purchases of $99+.'
            }
        ].map(({ testcase: tc, textParts: tp, text: ex }) => [tc, tp, ex])
    )('handles when %s', (_, parts, text) => {
        let container;
        // Should not throw an error with non-string text values
        expect(() => {
            container = render(<BreakText textParts={parts} options={{ tag: 'small', br: ['months'] }} />)?.container;
        }).not.toThrow();
        // Should not stringify invalid datatypes
        expect(
            Array.from(container.querySelectorAll('.br'))
                .map(n => n.innerHTML)
                .join(' ')
        ).toEqual(text);
    });

    test('handles mixed string and non-string text values', () => {
        const mixedTextParts = [
            ['Valid text string', ''],
            [null, ''],
            ['Another valid string', 'weak']
        ];

        const { getByText } = render(<BreakText textParts={mixedTextParts} options={{ tag: 'small', br: [] }} />);

        expect(getByText('Valid text string')).toBeInTheDocument();
        expect(getByText('Another valid string')).toBeInTheDocument();
    });
});
