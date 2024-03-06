import fs from 'fs';
import path from 'path';
import got from 'got';

import { PORT, VARIANT } from '../../src/server/constants';
import { populateTemplate, createMockZoidMarkup, waitForTimeout, btoa, toBinary } from './lib/miscellaneous';
import getDevAccountDetails from './lib/devAccountDetails';

// set this environment variable to simulate the time for the request to be answered
const REQUEST_DELAY = process.env.REQUEST_DELAY ?? 500;

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
        contextual_components: contextualComponents
    } = req.query;
    const account = merchantId || clientId || payerId;

    const { message } = getDevAccountDetails({ account, amount, buyerCountry });

    const populatedBanner = message
        ? JSON.parse(populateTemplate(message.template, message.morsVars))
        : await passthroughMessageReq(req);

    const memoryFS = compiler.compilers[2].outputFileSystem;
    const renderPath = path.resolve(__dirname, '../../dist/renderMessage.js');

    if (populatedBanner && memoryFS.existsSync(renderPath)) {
        // eslint-disable-next-line no-eval, security/detect-eval-with-expression
        const { render, validateStyle, getParentStyles } = eval(memoryFS.readFileSync(renderPath, 'utf8'));

        const warnings = [];

        const validatedStyle = validateStyle(
            warnings.push.bind(warnings),
            JSON.parse(style),
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

        const markup = render(
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
        const encodedData = btoa(toBinary(JSON.stringify(props)));
        const markup = createMockZoidMarkup({ component: 'message', encodedData, scriptUID, port });

        await waitForTimeout(REQUEST_DELAY);

        res.send(markup);
    });

    app.get('/credit-presentment/renderMessage', async (req, res) => {
        const props = await getMessageData(req);

        await waitForTimeout(REQUEST_DELAY);

        res.send(props);
    });
}
