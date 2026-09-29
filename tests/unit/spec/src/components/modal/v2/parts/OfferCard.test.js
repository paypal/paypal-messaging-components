/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import OfferCard from 'src/components/modal/v2/parts/OfferCard';

describe('<OfferCard />', () => {
    test('exposes the financing plan amount as a level-four heading while rendering existing HTML content', () => {
        const { getByRole } = render(
            <OfferCard
                offer={{
                    content: {
                        termsLabel: {
                            offerHeader: '<span>$215.44/mo</span> for 6 months'
                        }
                    },
                    meta: { apr: '0.00' }
                }}
            />
        );

        const offerHeading = getByRole('heading', { level: 4, name: '$215.44/mo for 6 months' });

        expect(offerHeading.querySelector('span')).toHaveTextContent('$215.44/mo');
    });
});
