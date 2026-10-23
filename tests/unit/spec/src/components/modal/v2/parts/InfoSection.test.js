/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import InfoSection from 'src/components/modal/v2/parts/InfoSection';

describe('<InfoSection />', () => {
    test('renders the headline as a level-two heading and each paragraph with its HTML content', () => {
        const { getByRole, container } = render(
            <InfoSection
                headline="TikTok Exclusive Spending Power"
                paragraphs={[
                    'Your TikTok spending power is an <strong>estimate</strong> of how much you can spend.',
                    'The amount may change over time.'
                ]}
            />
        );

        const headline = getByRole('heading', { level: 2, name: 'TikTok Exclusive Spending Power' });
        expect(headline).toBeInTheDocument();

        const paragraphs = container.querySelectorAll('.info-section__paragraph');
        expect(paragraphs).toHaveLength(2);
        expect(paragraphs[0]).toHaveTextContent('Your TikTok spending power is an estimate of how much you can spend.');
        expect(paragraphs[0].querySelector('strong')).toHaveTextContent('estimate');
        expect(paragraphs[1]).toHaveTextContent('The amount may change over time.');
    });
});
