/** @jsx h */
import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import LoadingShimmer from 'src/components/modal/v2/parts/LoadingShimmer';

describe('LoadingShimmer', () => {
    test.each([
        ['card', 'US'],
        ['accordion', 'DE']
    ])('hides the visual-only %s placeholders from assistive technology', (_, offerCountry) => {
        const { container } = render(<LoadingShimmer offerCountry={offerCountry} />);

        expect(screen.queryByRole('status')).not.toBeInTheDocument();

        const visualPlaceholders = Array.from(container.querySelectorAll('.offer__field-loading'));
        expect(visualPlaceholders).not.toHaveLength(0);
        expect(visualPlaceholders.every(placeholder => placeholder.closest('[aria-hidden="true"]'))).toBe(true);
    });
});
