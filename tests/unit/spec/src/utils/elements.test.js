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

        test('Logs a console error for expression-style values instead of silently no-oping', () => {
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            window.testFn = jest.fn();

            const div = document.createElement('div');
            div.setAttribute('data-pp-onclick', "testFn('arg', 42)");

            const options = getInlineOptions(div);
            options.onClick();

            expect(window.testFn).not.toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy.mock.calls[0][0]).toContain('data-pp-onclick');

            errorSpy.mockRestore();
            delete window.testFn;
        });
    });
});
