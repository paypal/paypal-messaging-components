/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import MutatedText from 'server/message/parts/MutatedText';

describe('<MutatedText />', () => {
    const smallText = 'Buy now. Pay over time.';
    const longText = ['No Interest if paid in full in 6 months', ['on purchases of $99+.', 'weak']];

    const tagData = [
        [smallText, ['default', 'xsmall', 'small']],
        [longText, ['medium', 'large', 'xlarge']]
    ];

    test('handles tag string', () => {
        const { getByText, queryByText } = render(<MutatedText tagData={tagData} options="small" />);

        expect(getByText(smallText)).toBeInTheDocument();
        expect(queryByText(longText[0])).toBeNull();
    });

    test('handles options object', () => {
        const { getByText, queryByText } = render(<MutatedText tagData={tagData} options={{ tag: 'small' }} />);

        expect(getByText(smallText)).toBeInTheDocument();
        expect(queryByText(longText[0])).toBeNull();
    });

    test('handles multiple tags', () => {
        const { getByText } = render(<MutatedText tagData={tagData} options={[{ tag: 'small' }, { tag: 'large' }]} />);

        expect(getByText(smallText)).toBeInTheDocument();
        expect(getByText(longText[0])).toBeInTheDocument();
        expect(getByText(longText[1][0])).toBeInTheDocument();
        expect(getByText(longText[1][0])).toHaveClass(longText[1][1]);
    });

    test('handles br mutation', () => {
        const { getByText } = render(<MutatedText tagData={tagData} options={{ tag: 'small', br: ['now.'] }} />);

        expect(getByText('Buy now.')).toBeInTheDocument();
        expect(getByText('Buy now.')).toHaveClass('br');
        expect(getByText('Pay over time.')).toBeInTheDocument();
        expect(getByText('Pay over time.')).toHaveClass('br');
    });

    test('handles replace mutation', () => {
        const { getByText, queryByText } = render(
            <MutatedText tagData={tagData} options={{ tag: 'small', replace: [['over time.', 'never!']] }} />
        );

        expect(getByText('Buy now. Pay never!')).toBeInTheDocument();
        expect(queryByText(smallText)).toBeNull();
    });

    describe('resolved-entry deduplication', () => {
        test.each([
            [
                'partial three-tag content',
                ['xsmall', 'large', 'default'],
                [
                    ['Short warning', ['xsmall']],
                    ['Learn more', ['default']]
                ],
                ['xsmall', 'default']
            ],
            [
                'complete three-tag content',
                ['xsmall', 'large', 'default'],
                [
                    ['Short warning', ['xsmall']],
                    ['Long warning', ['large']],
                    ['Learn more', ['default']]
                ],
                ['xsmall', 'large', 'default']
            ],
            ['single-entry content', ['xsmall', 'large', 'default'], [['Learn more', ['default']]], ['default']],
            [
                'identical text in distinct entries',
                ['large', 'default'],
                [
                    ['Same text', ['large']],
                    ['Same text', ['default']]
                ],
                ['large', 'default']
            ],
            [
                'dotted-tag fallback with an explicit match',
                ['large.2', 'large', 'default'],
                [
                    ['Long warning', ['large']],
                    ['Learn more', ['default']]
                ],
                ['large', 'default']
            ],
            ['fallback without an explicit match', ['large', 'xsmall'], [['Learn more', ['default']]], ['large']],
            ['explicit match before fallback', ['default', 'large'], [['Learn more', ['default']]], ['default']],
            ['unresolved tags', ['large'], [['Short warning', ['xsmall']]], []]
        ])('handles %s', (scenario, options, content, expectedTags) => {
            const { container } = render(<MutatedText tagData={content} options={options} deduplicate />);
            const entries = Array.from(container.children);

            expect(entries).toHaveLength(expectedTags.length);
            entries.forEach((entry, entryIndex) => {
                expect(entry).toHaveClass(`tag--${expectedTags[entryIndex]}`);
                expect(entry.textContent.trim()).toBe(
                    content.find(([, tags]) => tags.includes(expectedTags[entryIndex]))?.[0] ?? 'Learn more'
                );
                expect(entry.classList.contains('multi')).toBe(expectedTags.length > 1);
            });
            if (entries.length) {
                expect(entries[entries.length - 1].textContent.endsWith(' ')).toBe(false);
            }
        });

        test('keeps the exact matching option and its mutations', () => {
            const { container, getByText, queryByText } = render(
                <MutatedText
                    tagData={[[smallText, ['default']]]}
                    options={[
                        { tag: 'large', replace: [['over time.', 'fallback!']] },
                        { tag: 'default', replace: [['over time.', 'never!']] }
                    ]}
                    deduplicate
                />
            );

            expect(getByText('Buy now. Pay never!')).toBeInTheDocument();
            expect(queryByText('Buy now. Pay fallback!')).toBeNull();
            expect(container.firstElementChild).toHaveClass('tag--default');
        });

        test('does not deduplicate other callers by default', () => {
            const { getAllByText } = render(
                <MutatedText tagData={[[smallText, ['default']]]} options={['large', 'default']} />
            );

            expect(getAllByText(smallText)).toHaveLength(2);
        });
    });
});
