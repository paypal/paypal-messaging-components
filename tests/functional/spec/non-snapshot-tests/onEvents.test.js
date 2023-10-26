import selectors from '../utils/selectors';

const delay = async duration => new Promise(resolve => setTimeout(resolve, duration));

const getContext = () => {
    const events = ['onRender', 'onClick', 'onApply'];
    return {
        selectors,
        config: {
            account: 'DEV_US_NO_INTEREST',
            amount: 120,
            style: {
                layout: 'text'
            }
        },
        onEvents: events.reduce((acc, event) => {
            const eventMessage = `${event} callback`;
            return {
                ...acc,
                [event]: {
                    tagAttribute: `data-pp-${event.toLowerCase()}`,
                    outValue: eventMessage,
                    inValue: `console.log(\`${eventMessage}\`)`
                }
            };
        }, {})
    };
};

// Add a message banner with attached callbacks
const renderMessage = async method => {
    if (method === 'inline attribute') {
        return page.evaluate(async () => {
            const {
                onEvents,
                config: {
                    account,
                    amount,
                    style: { layout }
                }
            } = await getContext();

            const div = document.createElement('div');
            div.setAttribute('data-pp-account', account);
            div.setAttribute('data-pp-amount', amount);
            div.setAttribute('data-pp-style-layout', layout);

            // add a callback function for each event
            Object.values(onEvents).forEach(({ tagAttribute, inValue }) => {
                div.setAttribute(tagAttribute, inValue);
            });

            document.body.appendChild(div);
            await delay(200);

            div.setAttribute('data-pp-message', '');
            await delay(2000);
        });
    }
    return page.evaluate(async () => {
        const { onEvents, config } = await getContext();

        // given a json object, stringify it so it can be interpreted within an html script tag
        const writeMsgConfig = ({ ...cfg }) => {
            const transcribeFunctions = (key, val) =>
                Object.keys(onEvents).includes(key) ? `function (){ ${val} }` : val;
            // remove the quotes surrounding the stringified callback function
            return JSON.stringify(cfg, transcribeFunctions, '     ').replace(/"(function.+?)"/g, '$1');
        };

        const div = document.createElement('div');
        div.setAttribute('id', 'message');
        document.body.appendChild(div);
        await delay(200);

        const script = document.createElement('script');

        const eventCallbacks = Object.entries(onEvents).reduce((acc, [name, { inValue }]) => {
            // get a json object pairing the events to what we want them to execute
            return {
                ...acc,
                [name]: inValue
            };
        }, {});

        // Create the interior of the script function so that we create
        // a paypal message with attached callback events
        script.innerHTML = `
                paypal.Message(
                ${writeMsgConfig({ ...config, ...eventCallbacks })},
                ).render('#message')`;

        document.body.appendChild(script);
        await delay(2000);
    });
};

// Click the message banner to open the modal
const clickBanner = async () =>
    page.evaluate(async () => {
        const { selectors: select } = await getContext();

        const messageIframe = document.querySelector(select.banner.iframeByAttribute);
        const messageContainer = messageIframe.contentDocument.querySelector(select.banner.container);
        messageContainer.click();

        await delay(2000);
    });

// Click 'Apply Now' button on the modal
const clickApply = async () =>
    page.evaluate(async () => {
        const { selectors: select } = await getContext();
        const modalIframe = document.querySelector(select.modal.iframe);

        const applyNowButtons = modalIframe.contentDocument.querySelectorAll(select.modal.applynow);

        // We want to verify there is an Apply Now button to click,
        // eslint-disable-next-line no-console
        if (applyNowButtons) {
            console.log(`'Apply Now' Button exists`);
            applyNowButtons.click();
        }

        await delay(2000);
    });

// Verify a client can attach their own callback functions
describe('client callbacks', () => {
    // We will verify a callback was used by checking that the correct message was posted to the console
    const pageConsoleMessages = [];

    beforeAll(async () => {
        page.on('console', jshandle => {
            const message = `${jshandle.text()}`.replace(/[\n\s]+JSHandle@object\s*$/g, '');
            pageConsoleMessages.push(message);
        });
        page.on('pageerror', jshandle => {
            const error = `${jshandle}`;
            expect(error).toBe(false);
        });
    });

    beforeEach(async () => {
        await page.goto(`https://localhost.paypal.com:8080/blank.html`);
        await page.exposeFunction(`getContext`, getContext);
        await page.exposeFunction(`delay`, delay);
    });

    // Check that we can write a callback function on the message html tag
    test.each([
        // methods for attaching the callback function
        'inline attribute',
        'script'
    ])('%s', async method => {
        const {
            onEvents: {
                onRender: { outValue: renderOutput },
                onClick: { outValue: clickOutput },
                onApply: { outValue: applyOutput }
            }
        } = getContext();

        await renderMessage(method);
        expect(pageConsoleMessages).toEqual(expect.arrayContaining([renderOutput]));

        await clickBanner();
        expect(pageConsoleMessages).toEqual(expect.arrayContaining([clickOutput]));

        await clickApply();
        expect(pageConsoleMessages).toEqual(expect.arrayContaining([`'Apply Now' Button exists`, applyOutput]));
    });

    afterAll(() => {
        page.removeAllListeners('console');
        page.removeAllListeners('pageerror');
    });
});
