import fs from 'fs';
import path from 'path';
import got from 'got';

import { PORT, VARIANT } from '../../src/server/constants';
import { currencyFormat } from '../../src/utils/currencyFormat';
import { populateTemplate, createMockZoidMarkup, waitForTimeout } from './lib/miscellaneous';
import getDevAccountDetails from './lib/devAccountDetails';
import VARIABLE_PATH_MAP from './lib/v2VariablePathMap';

// set this environment variable to simulate the time for the request to be answered
const REQUEST_DELAY = process.env.REQUEST_DELAY ?? 500;

const parseJSONParam = (val, fallbackValue = {}) => {
    if (!val || typeof val !== 'string') {
        return fallbackValue;
    }

    try {
        return JSON.parse(val);
    } catch (err) {
        return fallbackValue;
    }
};

const extractProductCode = expression => {
    if (typeof expression !== 'string') {
        return null;
    }

    const [head] = expression.replace(/[{}]/g, '').split('.');
    return /^[A-Z0-9_]+$/.test(head) ? head : null;
};

const resolveMappedValue = (pathValue, morsVars, morsVarsByProduct) => {
    const normalizedExpression =
        typeof pathValue === 'string' ? pathValue.replace(/^\{/, '').replace(/\}$/, '').replace(/[{}]/g, '') : '';
    const productCode = extractProductCode(normalizedExpression);
    const normalizedPath = normalizedExpression
        .replace(/^[A-Z0-9_]+\.preferred_offer\.financing_code\./, '')
        .replace(/^[A-Z0-9_]+\.preferred_offer\./, '')
        .replace(/^[A-Z0-9_]+\./, '');
    const sourceKeys = VARIABLE_PATH_MAP[normalizedPath] ?? [normalizedPath];
    const variableSources = [];

    if (productCode && morsVarsByProduct?.[productCode]) {
        variableSources.push(morsVarsByProduct[productCode]);
    }

    if (morsVars) {
        variableSources.push(morsVars);
    }

    return variableSources.reduce((resolvedValue, source) => {
        if (resolvedValue !== undefined) {
            return resolvedValue;
        }

        const matchedKey = sourceKeys.find(key => source?.[key] !== undefined && source?.[key] !== null);

        return matchedKey ? source[matchedKey] : undefined;
    }, undefined);
};

const resolveV2TextVariable = (item, morsVars, morsVarsByProduct, warnings) => {
    if (!item || item.type !== 'TEXT_VARIABLE') {
        return item;
    }

    const resolvedValue =
        resolveMappedValue(item.text_path, morsVars, morsVarsByProduct) ??
        resolveMappedValue(item.text, morsVars, morsVarsByProduct);

    if (resolvedValue !== undefined && resolvedValue !== null) {
        return {
            ...item,
            text: currencyFormat(String(resolvedValue))
        };
    }

    warnings.push(`v2-variable-unresolved:${item.name ?? 'unknown'}`);

    return {
        ...item,
        text: typeof item.text === 'string' ? item.text : '-'
    };
};

const resolveV2ContentVariables = ({ v2Content, morsVars, morsVarsByProduct, warnings }) => {
    return Object.entries(v2Content ?? {}).reduce((resolvedContent, [contentKey, contentValue]) => {
        if (!contentKey.endsWith('_items') || !Array.isArray(contentValue)) {
            return {
                ...resolvedContent,
                [contentKey]: contentValue
            };
        }

        return {
            ...resolvedContent,
            [contentKey]: contentValue.map(item =>
                item?.type === 'TEXT_VARIABLE'
                    ? resolveV2TextVariable(item, morsVars, morsVarsByProduct, warnings)
                    : item
            )
        };
    }, {});
};

const shouldUseV2Renderer = req => {
    const { features } = req.query;
    const parsedFeatures = parseJSONParam(features, null);
    const featureTokens = typeof features === 'string' ? features.split(',').map(token => token.trim()) : [];

    return (
        featureTokens.includes('useRenderV2Message') ||
        (Array.isArray(parsedFeatures) && parsedFeatures.includes('useRenderV2Message')) ||
        parsedFeatures === 'useRenderV2Message'
    );
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

const getV2MessageData = (req, compiler) => {
    const {
        amount,
        style,
        buyerCountry,
        client_id: clientId,
        payer_id: payerId,
        merchant_id: merchantId,
        contextual_components: contextualComponents
    } = req.query;
    const account = merchantId || clientId || payerId;
    const parsedStyle = parseJSONParam(style, {});
    const warnings = [];

    const memoryFS = compiler.compilers[2].outputFileSystem;
    const renderPath = path.resolve(__dirname, '../../dist/renderV2Message.js');

    if (!memoryFS.existsSync(renderPath)) {
        return {
            markup: '<div data-test-v2-renderer="bundle-missing">renderV2Message bundle not found</div>',
            warnings: ['renderV2Message bundle not found in webpack output'],
            parentStyles: {},
            meta: {
                offerCountry: 'US',
                offerType: 'PAY_LATER_V2_TEST',
                messageType: 'CPS_V2_FIXTURE',
                rendererPath: 'v2-bundle-missing'
            }
        };
    }

    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
    const { render, validateStyle, getParentStyles } = eval(memoryFS.readFileSync(renderPath, 'utf8'));

    const validatedStyle = validateStyle(warnings.push.bind(warnings), parsedStyle);
    let v2Template;
    let v2Content;
    let country;
    let message;

    try {
        ({ country, message } = getDevAccountDetails({ account, amount, buyerCountry, useV2MessageContent: true }));

        if (!message?.template) {
            throw new Error(`Missing account-specific v2 content for account ${account ?? 'unknown'}`);
        }

        v2Template = JSON.parse(message.template);
        v2Content = v2Template?.content ?? v2Template;
    } catch (err) {
        return {
            markup: `<div class="message__container"><div class="message__messaging" data-test-v2-renderer-error="missing-v2-message" data-test-v2-account="${
                account ?? 'unknown'
            }">Missing v2 content for account ${account ?? 'unknown'}</div></div>`,
            warnings: [`v2-content-missing:${account ?? 'unknown'}:${err.message}`],
            parentStyles: getParentStyles(validatedStyle),
            meta: {
                offerCountry: buyerCountry ?? 'US',
                offerType: 'PAY_LATER_V2_TEST',
                messageType: 'CPS_V2_ERROR',
                rendererPath: 'v2-error',
                v2RenderDiagnostics: {
                    receivedStyle: validatedStyle,
                    requestedStyle: parsedStyle,
                    account: account ?? 'unknown',
                    errorCode: 'missing-v2-message'
                },
                trackingDetails: {
                    clickUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    impressionUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    payload: {}
                }
            }
        };
    }

    const renderOptions = {
        style: validatedStyle,
        amount,
        contextualComponents
    };

    const resolvedV2Content = resolveV2ContentVariables({
        v2Template,
        v2Content,
        morsVars: message?.morsVars ?? {},
        morsVarsByProduct: message?.morsVarsByProduct ?? {},
        warnings
    });

    const v2Markup = render(renderOptions, resolvedV2Content, warnings.push.bind(warnings));
    const parentStyles = getParentStyles(validatedStyle);

    const normalizedMeta = {
        offerCountry: v2Template?.meta?.offerCountry ?? country ?? buyerCountry ?? 'US',
        offerType: v2Template?.meta?.offerType ?? v2Template?.offer_types?.[0] ?? 'PAY_LATER_V2_TEST',
        messageType: v2Template?.meta?.messageType ?? v2Template?.type ?? 'CPS_V2_FIXTURE'
    };

    const styleMarker = {
        layout: validatedStyle.layout,
        color: validatedStyle.color ?? validatedStyle.text?.color ?? null,
        ratio: validatedStyle.ratio ?? null,
        logoType: validatedStyle.logo?.type ?? null,
        logoPosition: validatedStyle.logo?.position ?? null
    };

    return {
        markup: `<div class="message__container"><div class="message__messaging" data-test-v2-renderer="true" data-test-v2-layout="${
            validatedStyle.layout
        }" data-test-v2-style='${JSON.stringify(styleMarker)}'>${v2Markup}</div></div>`,
        warnings,
        parentStyles,
        meta: {
            ...normalizedMeta,
            displayedMessage: 'cps-v2-displayed-message-id',
            messageRequestId: 'cps-v2-message-request-id',
            rendererPath: 'v2',
            trackingDetails: {
                clickUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                impressionUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                payload: {}
            }
        }
    };
};

const getSmartMessageData = (req, compiler) => {
    if (shouldUseV2Renderer(req)) {
        return getV2MessageData(req, compiler);
    }

    return getMessageData(req, compiler);
};

export const __test__ = {
    formatCurrencyText: currencyFormat,
    resolveV2ContentVariables
};

export default function createMessageRoutes(app, server, compiler) {
    const { port } = server.options;

    app.get('/credit-presentment/smart/message', async (req, res) => {
        const { scriptUID } = req.query;
        const props = await getSmartMessageData(req, compiler);
        const jsonData = JSON.stringify(props);
        const markup = createMockZoidMarkup({ component: 'message', jsonData, scriptUID, port });

        await waitForTimeout(REQUEST_DELAY);

        res.send(markup);
    });

    app.get('/credit-presentment/renderMessage', async (req, res) => {
        const props = await getSmartMessageData(req, compiler);

        await waitForTimeout(REQUEST_DELAY);

        res.send(props);
    });
}
