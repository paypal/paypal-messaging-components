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

        test('Sets inlineExpression to false when no inline event handler attributes are present', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-amount', '100.00');

            const options = getInlineOptions(div);

            expect(options.inlineExpression).toBe(false);
            expect(options.inlineExpressionOnclickValue).toBeUndefined();
            expect(options.inlineExpressionOnapplyValue).toBeUndefined();
            expect(options.inlineExpressionOnrenderValue).toBeUndefined();
        });

        test('Sets inlineExpression to true and captures the raw value for a plain identifier handler', () => {
            window.testOnClick = jest.fn();

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', 'testOnClick');

            const options = getInlineOptions(div);

            expect(options.inlineExpression).toBe(true);
            expect(options.inlineExpressionOnclickValue).toBe('testOnClick');

            delete window.testOnClick;
        });

        test('Sets inlineExpression to true and captures the raw value for a call-style expression, without changing execution', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "trackEvent('click', 42)");

            const options = getInlineOptions(div);

            expect(options.inlineExpression).toBe(true);
            expect(options.inlineExpressionOnclickValue).toBe("trackEvent('click', 42)");
            expect(options.inlineExpressionOnapplyValue).toBeUndefined();
            expect(options.inlineExpressionOnrenderValue).toBeUndefined();
            // Execution is unchanged: the expression still runs via new Function, same as today.
            expect(options.onClick).toEqual(expect.any(Function));
            expect(options.onClick.toString()).toContain("trackEvent('click', 42)");
        });

        test('Tracks onclick, onapply, and onrender independently', () => {
            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "clickFn('a')");
            div.setAttribute('data-pp-onapply', 'myApplyHandler');
            div.setAttribute('data-pp-onrender', "renderFn('c')");

            const options = getInlineOptions(div);

            expect(options.inlineExpression).toBe(true);
            expect(options.inlineExpressionOnclickValue).toBe("clickFn('a')");
            expect(options.inlineExpressionOnapplyValue).toBe('myApplyHandler');
            expect(options.inlineExpressionOnrenderValue).toBe("renderFn('c')");
        });
    });
});
