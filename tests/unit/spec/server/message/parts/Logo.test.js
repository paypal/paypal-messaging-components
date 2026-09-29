/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import Logo from 'server/message/parts/Logo';

describe('<Logo />', () => {
    test('keeps every fragment of a composite logo decorative', () => {
        const { container } = render(
            <Logo
                mutations={[
                    { src: 'monogram.svg', dimensions: [24, 32] },
                    { src: 'wordmark.svg', dimensions: [100, 32] }
                ]}
            />
        );

        expect(container.querySelector('.message__logo-container')).not.toHaveAttribute('aria-hidden');
        expect(container.querySelectorAll('.message__logo[aria-hidden="true"]')).toHaveLength(2);
        expect(container.querySelectorAll('img[alt=""][role="presentation"]')).toHaveLength(2);
    });

    test('keeps a single-image logo decorative', () => {
        const { container } = render(<Logo mutations={{ src: 'wordmark.svg', dimensions: [100, 32] }} />);

        expect(container.querySelector('.message__logo')).toHaveAttribute('aria-hidden', 'true');
        expect(container.querySelector('img')).toHaveAttribute('alt', '');
        expect(container.querySelector('img')).toHaveAttribute('role', 'presentation');
    });
});
