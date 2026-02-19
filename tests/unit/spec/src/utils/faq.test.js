import { getFaqUrl } from 'src/utils/faq';

describe('utils/faq', () => {
    describe('getFaqUrl', () => {
        test('returns correct URL for RENDERING topic', () => {
            const url = getFaqUrl('RENDERING');
            expect(url).toBe(
                'https://developer.paypal.com/docs/checkout/pay-later/us/integrate/#enable-pay-later-messaging-on-your-website'
            );
        });

        test('returns correct URL for GENERAL topic', () => {
            const url = getFaqUrl('GENERAL');
            expect(url).toBe('https://developer.paypal.com/docs/checkout/pay-later/us/integrate/reference/');
        });

        test('falls back to GENERAL for unknown topics', () => {
            const url = getFaqUrl('UNKNOWN_TOPIC');
            expect(url).toBe('https://developer.paypal.com/docs/checkout/pay-later/us/integrate/reference/');
        });

        test('handles undefined topic', () => {
            const url = getFaqUrl(undefined);
            expect(url).toBe('https://developer.paypal.com/docs/checkout/pay-later/us/integrate/reference/');
        });

        test('normalizes base URL with trailing slash', () => {
            // Mock __MESSAGES__ with trailing slash
            global.__MESSAGES__ = {
                __FAQ__: {
                    __BASE_URL__: 'https://developer.paypal.com/docs/checkout/pay-later/us/'
                }
            };

            const url = getFaqUrl('RENDERING');
            // Should not have double slashes
            expect(url).toBe(
                'https://developer.paypal.com/docs/checkout/pay-later/us/integrate/#enable-pay-later-messaging-on-your-website'
            );
            expect(url).not.toContain('//integrate');

            // Clean up
            delete global.__MESSAGES__;
        });
    });
});
