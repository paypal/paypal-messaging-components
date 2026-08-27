/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import Logo from 'server/message/parts/Logo';

describe('<Logo />', () => {
    test('exposes a single PayPal text alternative for a composite logo', () => {
        const { container, getByAltText } = render(
            <Logo
                mutations={[
                    { src: 'monogram.svg', dimensions: [24, 32] },
                    { src: 'wordmark.svg', dimensions: [100, 32] }
                ]}
            />
        );

        expect(container.querySelector('.message__logo-container')).not.toHaveAttribute('aria-hidden');
        expect(getByAltText('PayPal')).toHaveAttribute('src', 'monogram.svg');
        expect(container.querySelectorAll('img[alt="PayPal"]')).toHaveLength(1);
        expect(container.querySelector('img[src="wordmark.svg"]')).toHaveAttribute('alt', '');
    });

    test('exposes the PayPal text alternative for a single-image logo', () => {
        const { getByAltText } = render(<Logo mutations={{ src: 'wordmark.svg', dimensions: [100, 32] }} />);

        expect(getByAltText('PayPal')).toHaveAttribute('src', 'wordmark.svg');
    });
});
