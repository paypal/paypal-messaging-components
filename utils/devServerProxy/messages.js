import fs from 'fs';
import path from 'path';
import got from 'got';

import { PORT, VARIANT } from '../../src/server/constants';
import { populateTemplate, createMockZoidMarkup, waitForTimeout } from './lib/miscellaneous';
import getDevAccountDetails from './lib/devAccountDetails';

// set this environment variable to simulate the time for the request to be answered
const REQUEST_DELAY = process.env.REQUEST_DELAY ?? 500;
const PAYPAL_BADGE_URL = 'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_badge.svg';
const PAYPAL_BADGE_INLINE_URL = 'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_badge_inline.svg';
const PAYPAL_CREDIT_BADGE_URL = 'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_credit_badge.svg';
const PAYPAL_CREDIT_BADGE_INLINE_URL =
    'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_credit_badge_inline.svg';
const DEMO_CLICK_URL = 'https://www.paypal.com/ppclander';
const DEMO_IMPRESSION_URL = 'https://www.paypal.com/credit-presentment/log';

const createLink = text => ({
    type: 'LINK',
    text,
    click_url: DEMO_CLICK_URL,
    embeddable: true
});

const v2DemoContent = {
    V2_DE_PLP1_SQ_NON_INLINE: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'IMAGE',
                name: 'paypal_logo',
                source_url: PAYPAL_BADGE_URL,
                alternative_text: 'PayPal'
            },
            {
                type: 'TEXT',
                text: 'Bezahlen Sie nach 30 Tagen.'
            }
        ],
        action_items: [createLink('Mehr erfahren')]
    },
    V2_DE_PLP1_SQ_INLINE: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'TEXT',
                text: 'Bezahlen Sie nach 30 Tagen mit '
            },
            {
                type: 'IMAGE',
                name: 'paypal_logo',
                source_url: PAYPAL_BADGE_INLINE_URL,
                alternative_text: 'PayPal'
            },
            {
                type: 'TEXT',
                text: '.'
            }
        ],
        action_items: []
    },
    V2_US_PLLT_MQ_GZ_INLINE_MONTHLY: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'TEXT',
                alternative_text: 'As low as $23.84 per month with ',
                text: 'As low as $23.84/mo with '
            },
            {
                type: 'IMAGE',
                name: 'paypal_logo',
                source_url: PAYPAL_BADGE_INLINE_URL,
                alternative_text: 'PayPal'
            },
            {
                type: 'TEXT',
                text: '.'
            }
        ],
        action_items: [createLink('Learn more')]
    },
    V2_US_PLLT_MQ_GZ_MONTHLY: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'IMAGE',
                name: 'paypal_logo',
                source_url: PAYPAL_BADGE_URL,
                alternative_text: 'PayPal'
            },
            {
                type: 'TEXT',
                alternative_text: 'As low as $23.84 per month.',
                text: 'As low as $23.84/mo.'
            }
        ],
        action_items: [createLink('Learn more')]
    },
    V2_US_PPCNI_SQ_PAYPAL_CREDIT: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'IMAGE',
                name: 'paypal_credit_logo',
                source_url: PAYPAL_CREDIT_BADGE_URL,
                alternative_text: 'PayPal Credit'
            },
            {
                type: 'TEXT',
                text: 'No Interest if paid in full in 6 months.'
            }
        ],
        action_items: [createLink('Learn more')]
    },
    V2_US_PPCNI_SQ_INLINE_PAYPAL_CREDIT: {
        impression_url: DEMO_IMPRESSION_URL,
        main_items: [
            {
                type: 'TEXT',
                text: 'No Interest if paid in full in 6 months with '
            },
            {
                type: 'IMAGE',
                name: 'paypal_credit_logo',
                source_url: PAYPAL_CREDIT_BADGE_INLINE_URL,
                alternative_text: 'PayPal Credit'
            },
            {
                type: 'TEXT',
                text: '.'
            }
        ],
        action_items: [createLink('Learn more')]
    }
};

const createV2Content = ({ channel, populatedBanner }) =>
    v2DemoContent[channel] ?? {
        main_items: [
            {
                type: 'IMAGE',
                source_url: PAYPAL_BADGE_URL,
                alternative_text: 'PayPal',
                name: 'paypal_logo'
            },
            {
                type: 'TEXT',
                text: 'Pay in 4 interest-free payments'
            }
        ],
        action_items: [
            {
                ...createLink('Learn more'),
                click_url: populatedBanner?.meta?.lander || DEMO_CLICK_URL
            }
        ],
        disclaimer_items: [{ type: 'TEXT', text: 'Subject to approval.' }]
    };

const getCompiledBundle = (compiler, filename) => {
    const renderPath = path.resolve(__dirname, `../../dist/${filename}`);
    const compilers = compiler?.compilers ?? [compiler];

    const bundleCompiler = compilers.find(({ outputFileSystem }) => outputFileSystem?.existsSync?.(renderPath));

    return bundleCompiler ? bundleCompiler.outputFileSystem.readFileSync(renderPath, 'utf8') : null;
};

const passthroughMessageReq = async req => {
    const { style, ...params } = req.query;
    const query = Object.entries({
        ...params,
        variant: VARIANT
    })
        .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
        .slice(1);

    const { statusCode, body } = await got(`https://www.paypal.com/credit-presentment/messages?${query}`);

    return statusCode === 200 ? JSON.parse(body) : null;
};

const getMessageData = async (req, compiler) => {
    const {
        amount,
        client_id: clientId,
        payer_id: payerId,
        merchant_id: merchantId,
        style,
        buyerCountry,
        contextual_components: contextualComponents,
        features,
        channel
    } = req.query;
    const account = merchantId || clientId || payerId;
    const useV2Renderer = features?.split(',').includes('render-v2-message');

    const { message } = getDevAccountDetails({ account, amount, buyerCountry });

    const populatedBanner = message
        ? JSON.parse(populateTemplate(message.template, message.morsVars))
        : await passthroughMessageReq(req);

    const renderFilename = useV2Renderer ? 'renderV2Message.js' : 'renderMessage.js';
    const bundle = getCompiledBundle(compiler, renderFilename);

    if (populatedBanner && bundle) {
        // eslint-disable-next-line no-eval, security/detect-eval-with-expression
        const { render, validateStyle, getParentStyles } = eval(bundle);

        const warnings = [];
        const parsedStyle = JSON.parse(style);

        const validatedStyle = useV2Renderer
            ? validateStyle(warnings.push.bind(warnings), parsedStyle)
            : validateStyle(
                  warnings.push.bind(warnings),
                  parsedStyle,
                  populatedBanner.meta.offerCountry,
                  populatedBanner.meta.offerType,
                  contextualComponents
              );

        let customMarkup = '';

        if (validatedStyle.layout === 'custom' && validatedStyle.markup) {
            if (validatedStyle.markup.includes('https://localhost.paypal.com:8080/')) {
                customMarkup = fs.readFileSync(
                    `demo/${validatedStyle.markup.replace('https://localhost.paypal.com:8080/', '')}`,
                    'utf-8'
                );
            } else {
                ({ body: customMarkup } = await got(validatedStyle.markup));
            }
        }

        const markup = useV2Renderer
            ? render(
                  { style: validatedStyle, amount },
                  createV2Content({ channel, populatedBanner }),
                  warnings.push.bind(warnings)
              )
            : render(
                  { style: validatedStyle, amount, customMarkup, contextualComponents },
                  populatedBanner,
                  warnings.push.bind(warnings)
              );
        const parentStyles = getParentStyles(validatedStyle);

        return {
            markup,
            warnings,
            parentStyles,
            meta: {
                ...populatedBanner.meta,
                displayedMessage: '928ad66d-81de-440e-8c47-69bb3c3a5623',
                messageRequestId: 'acb0956c-d0a6-4b57-9bc5-c1daaa93d313',
                trackingDetails: {
                    clickUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    impressionUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    payload: {}
                }
            }
        };
    }

    return {};
};

export default function createMessageRoutes(app, server, compiler) {
    const { port } = server.options;

    app.get('/credit-presentment/smart/message', async (req, res) => {
        const { scriptUID } = req.query;
        const props = await getMessageData(req, compiler);
        const jsonData = JSON.stringify(props);
        const markup = createMockZoidMarkup({ component: 'message', jsonData, scriptUID, port });

        await waitForTimeout(REQUEST_DELAY);

        res.send(markup);
    });

    app.get('/credit-presentment/renderMessage', async (req, res) => {
        const props = await getMessageData(req);

        await waitForTimeout(REQUEST_DELAY);

        res.send(props);
    });
}
