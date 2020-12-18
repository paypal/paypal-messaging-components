/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import CustomMessage from '@renderer/message/parts/CustomMessage';

jest.mock('@renderer/locale', () => ({
    getLogos: () => ({
        PRIMARY: {
            COLOR: {
                src: 'color.png'
            }
        }
    })
}));

describe('<CustomMessage />', () => {
    test('renders a custom message', () => {
        const data = {
            headline: [
                ['Buy now. Pay over time.', ['default', 'xsmall', 'small']],
                [
                    ['No Interest if paid in full in 6 months', ['on purchases of $99+', 'weak']],
                    ['medium', 'large', 'xlarge']
                ]
            ]
        };
        const template = '<div>{{headline.small}} {{logo.primary.color}}</div>';
        const { getByText, getByAltText, queryByText } = render(
            <CustomMessage data={data} template={template} meta={{}} />
        );
        expect(getByText(data.headline[0][0])).toBeInTheDocument();
        expect(queryByText(data.headline[1][0][0])).toBeNull();
        expect(queryByText('{{headline.small}}')).toBeNull();

        expect(getByAltText('PayPal Credit logo')).toBeInTheDocument();
        expect(getByAltText('PayPal Credit logo')).toHaveAttribute('src', 'color.png');
    });
});
