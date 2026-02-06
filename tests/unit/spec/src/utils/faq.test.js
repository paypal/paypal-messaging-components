import { getFaqUrl } from 'src/utils/faq';

describe('utils/faq', () => {
    describe('getFaqUrl', () => {
        test('returns correct URL for MESSAGE_HIDDEN topic', () => {
            const url = getFaqUrl('MESSAGE_HIDDEN');
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/#message-hidden');
        });

        test('returns correct URL for INVALID_OPTIONS topic', () => {
            const url = getFaqUrl('INVALID_OPTIONS');
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/#invalid-options');
        });

        test('returns correct URL for INTEGRATION topic', () => {
            const url = getFaqUrl('INTEGRATION');
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/#integration');
        });

        test('returns correct URL for RENDER_WARNING topic', () => {
            const url = getFaqUrl('RENDER_WARNING');
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/#rendering');
        });

        test('falls back to GENERAL for unknown topics', () => {
            const url = getFaqUrl('UNKNOWN_TOPIC');
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/');
        });

        test('handles undefined topic', () => {
            const url = getFaqUrl(undefined);
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/');
        });

        test('normalizes base URL with trailing slash', () => {
            // Mock __MESSAGES__ with trailing slash
            global.__MESSAGES__ = {
                __FAQ__: {
                    __BASE_URL__: 'https://developer.paypal.com/docs/business/pay-later/'
                }
            };

            const url = getFaqUrl('MESSAGE_HIDDEN');
            // Should not have double slashes
            expect(url).toBe('https://developer.paypal.com/docs/business/pay-later/troubleshooting/#message-hidden');
            expect(url).not.toContain('//troubleshooting');

            // Clean up
            delete global.__MESSAGES__;
        });
    });
});
