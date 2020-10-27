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
});
