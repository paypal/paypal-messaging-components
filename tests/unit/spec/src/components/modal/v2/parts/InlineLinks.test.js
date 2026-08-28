/** @jsx h */
import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import InlineLinks from 'src/components/modal/v2/parts/InlineLinks';
import { XPropsProvider } from 'src/components/modal/v2/lib/providers/xprops';

describe('InlineLinks', () => {
    beforeEach(() => {
        window.xprops = {
            onClick: jest.fn(),
            onProps: jest.fn()
        };
    });

    afterEach(() => {
        delete window.xprops;
    });

    test('keeps default browser navigation for disclosure links', () => {
        const { getByRole } = render(
            <XPropsProvider>
                <InlineLinks text={[['Learn more', 'https://www.paypal.com/', 'Learn more']]} />
            </XPropsProvider>
        );

        const link = getByRole('link', { name: 'Learn more' });
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        fireEvent(link, clickEvent);

        expect(clickEvent.defaultPrevented).toBe(false);
        expect(window.xprops.onClick).toHaveBeenCalledWith({
            linkName: 'Learn more',
            src: 'link_click'
        });
    });
});
