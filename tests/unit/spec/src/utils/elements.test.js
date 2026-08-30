import { getInlineOptions } from 'src/utils/elements';

// Spy on window in order to manipulate attributes
const windowSpy = jest.spyOn(window, 'window', 'get');

describe('elements utils', () => {
    afterEach(() => {
        windowSpy.mockClear();
        delete window.__paypal_messages_inline_handlers__;
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
            window.testOnClick = jest.fn();
            window.testOnRender = jest.fn();
            window.testOnApply = jest.fn();

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'testOnClick');
            div.setAttribute('data-pp-onrender', 'testOnRender()');
            div.setAttribute('data-pp-onapply', 'testOnApply');

            const options = getInlineOptions(div);

            expect(options).toMatchObject({
                // Ensure values are converted to functions
                onClick: expect.any(Function),
                onRender: expect.any(Function),
                onApply: expect.any(Function)
            });

            options.onClick('arg1');
            options.onRender();
            options.onApply();

            expect(window.testOnClick).toHaveBeenCalledTimes(1);
            expect(window.testOnClick).toHaveBeenCalledWith('arg1');
            expect(window.testOnRender).toHaveBeenCalledTimes(1);
            expect(window.testOnApply).toHaveBeenCalledTimes(1);

            delete window.testOnClick;
            delete window.testOnRender;
            delete window.testOnApply;
        });

        test('Handles dot-notation inline event hooks', () => {
            window.testNs = { onClick: jest.fn() };

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'testNs.onClick');

            const options = getInlineOptions(div);

            options.onClick();

            expect(window.testNs.onClick).toHaveBeenCalledTimes(1);

            delete window.testNs;
        });

        test('Handles expression-style inline event hooks with arguments', () => {
            window.b = 'merchant-variable';
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'console.log(2, b)');

            const options = getInlineOptions(div);

            expect(window.__paypal_messages_inline_handlers__).toBeDefined();
            expect(Object.keys(window.__paypal_messages_inline_handlers__).length).toBe(1);

            options.onClick();

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith(2, 'merchant-variable');

            logSpy.mockRestore();
            delete window.b;
        });

        test('Preserves inline source in handler toString output', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'console.log("onClick")');
            div.setAttribute('data-pp-onrender', 'console.log("onRender")');
            div.setAttribute('data-pp-onapply', 'console.log("onApply")');

            const options = getInlineOptions(div);

            expect(options.onClick.toString()).toContain('console.log("onClick")');
            expect(options.onRender.toString()).toContain('console.log("onRender")');
            expect(options.onApply.toString()).toContain('console.log("onApply")');
        });

        test('Handles arrow-function inline hooks with block body', () => {
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "() => { console.log('Callback called on click'); }");

            const options = getInlineOptions(div);
            options.onClick();

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith('Callback called on click');

            logSpy.mockRestore();
        });

        test('Handles arrow-function inline hooks with params', () => {
            window.trackClick = jest.fn();
            window.b = 'merchant-variable';

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', '(event) => trackClick(event, b)');

            const options = getInlineOptions(div);
            const clickPayload = { source: 'message-link' };
            options.onClick(clickPayload);

            expect(window.trackClick).toHaveBeenCalledTimes(1);
            expect(window.trackClick).toHaveBeenCalledWith(clickPayload, 'merchant-variable');

            delete window.trackClick;
            delete window.b;
        });

        test('Logs a control-flow warning for unsupported inline handler bodies', () => {
            window.b = true;
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "() => { if (b) console.log('x'); }");

            const options = getInlineOptions(div);
            options.onClick();

            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy.mock.calls[0][0]).toContain('Control-flow statements are not supported');

            errorSpy.mockRestore();
            delete window.b;
        });

        test('Logs a multiple-statements warning for unsupported inline handler bodies', () => {
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "() => { console.log('a'); console.log('b'); }");

            const options = getInlineOptions(div);
            options.onClick();

            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy.mock.calls[0][0]).toContain('Multiple statements are not supported');

            errorSpy.mockRestore();
        });
    });
});
