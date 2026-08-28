/** @jsx h */
import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import InlineLinks from 'src/components/modal/v2/parts/InlineLinks';
import Disclosure from 'src/components/modal/v2/parts/Disclosure';
import { XPropsProvider } from 'src/components/modal/v2/lib/providers/xprops';
import { ServerDataProvider } from 'src/components/modal/v2/lib/providers/serverData';
import { DisclosureViewProvider, useDisclosureView } from 'src/components/modal/v2/lib/providers/disclosureView';

// Mirrors how BodyContent renders the Disclosure overlay based on the shared context.
const DisclosureOverlay = () => {
    const { disclosureUrl, closeDisclosure } = useDisclosureView();
    return disclosureUrl ? <Disclosure url={disclosureUrl} onBack={closeDisclosure} /> : null;
};

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

    test('opens the disclosure inline for content flagged useInlineDisclosure instead of navigating away', () => {
        const { getByRole, container } = render(
            <XPropsProvider>
                <ServerDataProvider data={{ views: [{ meta: { useInlineDisclosure: 'true' } }] }}>
                    <DisclosureViewProvider>
                        <InlineLinks text={[['Learn more', 'https://www.paypal.com/', 'Learn more']]} />
                        <DisclosureOverlay />
                    </DisclosureViewProvider>
                </ServerDataProvider>
            </XPropsProvider>
        );

        const link = getByRole('link', { name: 'Learn more' });
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        fireEvent(link, clickEvent);

        expect(clickEvent.defaultPrevented).toBe(true);
        expect(container.querySelector('.disclosure-view__frame')).toHaveAttribute('src', 'https://www.paypal.com/');
        expect(window.xprops.onClick).toHaveBeenCalledWith({
            linkName: 'Learn more',
            src: 'link_click',
            url: 'https://www.paypal.com/'
        });
    });

    test('keeps browser default behavior for content without useInlineDisclosure', () => {
        const { getByRole, container } = render(
            <XPropsProvider>
                <ServerDataProvider data={{ views: [{ meta: { product: 'PAY_LATER_SHORT_TERM' } }] }}>
                    <DisclosureViewProvider>
                        <InlineLinks text={[['Learn more', 'https://www.paypal.com/', 'Learn more']]} />
                        <DisclosureOverlay />
                    </DisclosureViewProvider>
                </ServerDataProvider>
            </XPropsProvider>
        );

        const link = getByRole('link', { name: 'Learn more' });
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        fireEvent(link, clickEvent);

        expect(clickEvent.defaultPrevented).toBe(false);
        expect(container.querySelector('.disclosure-view__frame')).toBeNull();
        expect(window.xprops.onClick).toHaveBeenCalledWith({
            linkName: 'Learn more',
            src: 'link_click',
            url: 'https://www.paypal.com/'
        });
    });
});
