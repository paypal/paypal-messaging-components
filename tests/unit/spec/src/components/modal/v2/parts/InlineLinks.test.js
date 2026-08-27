/** @jsx h */
import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import InlineLinks from 'src/components/modal/v2/parts/InlineLinks';
import { XPropsProvider } from 'src/components/modal/v2/lib/providers/xprops';

describe('InlineLinks', () => {
    const originalNavigator = window.navigator;
    const originalWebkit = window.webkit;
    const originalAndroid = global.Android;

    beforeEach(() => {
        window.xprops = {
            onClick: jest.fn(),
            onProps: jest.fn()
        };
    });

    afterEach(() => {
        Object.defineProperty(window, 'navigator', {
            configurable: true,
            value: originalNavigator
        });
        window.webkit = originalWebkit;
        global.Android = originalAndroid;
        delete window.xprops;
    });

    test('prevents default navigation for native webview disclosures', () => {
        Object.defineProperty(window, 'navigator', {
            configurable: true,
            value: {
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            }
        });
        window.webkit = {
            messageHandlers: {
                paypalMessageModalCallbackHandler: {
                    postMessage: jest.fn()
                }
            }
        };

        const { getByRole } = render(
            <XPropsProvider>
                <InlineLinks text={[['Learn more', 'https://www.paypal.com/', 'Learn more']]} />
            </XPropsProvider>
        );

        const link = getByRole('link', { name: 'Learn more' });
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        fireEvent(link, clickEvent);

        expect(clickEvent.defaultPrevented).toBe(true);
        expect(window.xprops.onClick).toHaveBeenCalledWith({
            linkName: 'Learn more',
            src: 'link_click',
            url: 'https://www.paypal.com/'
        });
    });

    test('keeps browser default behavior for non-native webview disclosures', () => {
        Object.defineProperty(window, 'navigator', {
            configurable: true,
            value: {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0'
            }
        });

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
            src: 'link_click',
            url: 'https://www.paypal.com/'
        });
    });
});
