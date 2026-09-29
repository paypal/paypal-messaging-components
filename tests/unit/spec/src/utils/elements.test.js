import { getInlineOptions } from 'src/utils/elements';

// Spy on window in order to manipulate attributes
const windowSpy = jest.spyOn(window, 'window', 'get');

describe('elements utils', () => {
    afterEach(() => {
        windowSpy.mockClear();
    });

    describe('getInlineOptions', () => {
        test('Handles top-level and nested properties', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-amount', '100.00');
            div.setAttribute('data-pp-style-logo-type', 'primary');
            div.setAttribute('something-else', 'garbage');

            const options = getInlineOptions(div);

            expect(options).toMatchObject({
                amount: '100.00',
                style: {
                    logo: {
                        type: 'primary'
                    }
                }
            });
        });

        test('Handles camel-case property', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-buyercountry', 'US');
            div.setAttribute('data-pp-nocamelcase', 'US');

            const options = getInlineOptions(div);

            expect(options).toMatchObject({
                buyerCountry: 'US',
                nocamelcase: 'US'
            });
        });

        test('Handles inline event hooks', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'console.log("onClick")');
            div.setAttribute('data-pp-onrender', 'console.log("onRender")');
            div.setAttribute('data-pp-onapply', 'console.log("onApply")');

            const options = getInlineOptions(div);

            expect(options).toMatchObject({
                // Ensure values are converted to functions
                onClick: expect.any(Function),
                onRender: expect.any(Function),
                onApply: expect.any(Function)
            });

            expect(options.onClick.toString()).toContain('console.log("onClick")');
            expect(options.onRender.toString()).toContain('console.log("onRender")');
            expect(options.onApply.toString()).toContain('console.log("onApply")');
        });

        describe('inline event hooks on a PayPal-owned origin', () => {
            const originalLocation = window.location;

            const setHostname = hostname => {
                delete window.location;
                window.location = { ...originalLocation, hostname };
            };

            afterEach(() => {
                window.location = originalLocation;
            });

            test.each(['www.paypal.com', 'sandbox.paypal.com', 'testenv.qa.paypal.com', 'a.b.paypal.com'])(
                'blocks inline handlers when hostname is %s',
                hostname => {
                    setHostname(hostname);

                    const div = document.createElement('div');
                    div.setAttribute('data-pp-onclick', 'console.log("onClick")');
                    div.setAttribute('data-pp-onrender', 'console.log("onRender")');
                    div.setAttribute('data-pp-onapply', 'console.log("onApply")');

                    const options = getInlineOptions(div);

                    expect(options.onClick).toBeUndefined();
                    expect(options.onRender).toBeUndefined();
                    expect(options.onApply).toBeUndefined();
                }
            );

            test.each(['notpaypal.com', 'paypal.com.attacker.net', 'evilpaypal.com', 'merchant.example.com'])(
                'still allows inline handlers when hostname is %s',
                hostname => {
                    setHostname(hostname);

                    const div = document.createElement('div');
                    div.setAttribute('data-pp-onclick', 'console.log("onClick")');

                    const options = getInlineOptions(div);

                    expect(options.onClick).toEqual(expect.any(Function));
                    expect(options.onClick.toString()).toContain('console.log("onClick")');
                }
            );
        });
    });
});
