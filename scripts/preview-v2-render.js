#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Minimal local preview server for the renderV2Message SSR bundle.
 * Fetches the stage CDN bundle, renders a sample message, and serves it in a browser.
 *
 * Usage:
 *   node scripts/preview-v2-render.js [stageTag]
 *   node scripts/preview-v2-render.js render_v2_msg
 *
 * Then open: http://localhost:3030
 */

const http = require('http');
const https = require('https');

const STAGE_TAG = process.argv[2] || 'render_v2_msg';
const BUNDLE_URL = `https://cdn-${STAGE_TAG}.static.engineering.dev.paypalinc.com/upstream/bizcomponents/stage/renderV2Message.js`;
const PORT = 3030;

function fetchBundle(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, res => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}`));
                    return;
                }
                const chunks = [];
                res.on('data', c => chunks.push(c));
                res.on('end', () => resolve(Buffer.concat(chunks).toString()));
                res.on('error', reject);
            })
            .on('error', reject);
    });
}

function evalBundle(code) {
    const mod = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('exports', 'module', 'require', code)(mod.exports, mod, require);
    return mod.exports.renderV2Message || mod.exports;
}

function extractPreferredContent(response) {
    return response?.messages?.[0]?.preferred_message?.content || {};
}

// Simulated v2 API responses (one per variant)
const VARIANTS = [
    {
        label: 'Text layout — logo + Pay Later headline',
        style: { layout: 'text', logo: { type: 'primary', position: 'left' }, text: { color: 'black', size: 14 } },
        v2Response: {
            messages: [
                {
                    preferred_message: {
                        content: {
                            main_items: [
                                {
                                    type: 'IMAGE',
                                    name: 'paypal_logo',
                                    source_url:
                                        'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_wordmark.svg',
                                    alternative_text: 'PayPal'
                                },
                                { type: 'TEXT', text: 'Buy now, pay later.' }
                            ],
                            action_items: [
                                {
                                    type: 'LINK',
                                    text: 'Learn more',
                                    click_url: 'https://www.paypal.com/credit-presentment/lander',
                                    embeddable: true
                                }
                            ]
                        }
                    }
                }
            ]
        }
    },
    {
        label: 'Text layout — no action items',
        style: { layout: 'text', logo: { type: 'alternative', position: 'left' }, text: { color: 'black' } },
        v2Response: {
            messages: [
                {
                    preferred_message: {
                        content: {
                            main_items: [
                                {
                                    type: 'IMAGE',
                                    name: 'paypal_logo',
                                    source_url:
                                        'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_wordmark.svg',
                                    alternative_text: 'PayPal'
                                },
                                { type: 'TEXT', text: '4 interest-free payments of $25.00.' }
                            ],
                            action_items: []
                        }
                    }
                }
            ]
        }
    },
    {
        label: 'Text layout — logo right',
        style: { layout: 'text', logo: { type: 'primary', position: 'right' }, text: { color: 'black' } },
        v2Response: {
            messages: [
                {
                    preferred_message: {
                        content: {
                            main_items: [
                                { type: 'TEXT', text: 'As low as $26.94/mo.' },
                                {
                                    type: 'IMAGE',
                                    name: 'paypal_logo',
                                    source_url:
                                        'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_wordmark.svg',
                                    alternative_text: 'PayPal'
                                }
                            ],
                            action_items: [
                                {
                                    type: 'LINK',
                                    text: 'Learn more',
                                    click_url: 'https://www.paypal.com/credit-presentment/lander',
                                    embeddable: true
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
];

async function buildPage(mod) {
    const sections = VARIANTS.map(({ label, style, v2Response }) => {
        const logs = [];
        const addLog = msg => logs.push(msg);
        const validStyle = mod.validateStyle(addLog, style);
        const parentStyles = mod.getParentStyles(validStyle) || '';
        const html = mod.render(
            { style: validStyle, amount: 100, currency: 'USD', locale: 'en_US', buyerCountry: 'US' },
            extractPreferredContent(v2Response),
            addLog
        );
        return `
            <section>
                <h2>${label}</h2>
                <div class="preview-frame">
                    <style>${parentStyles}</style>
                    ${html}
                </div>
                ${logs.length ? `<pre class="logs">Logs: ${logs.join('\n')}</pre>` : ''}
            </section>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>renderV2Message Preview — ${STAGE_TAG}</title>
    <style>
        body { font-family: sans-serif; max-width: 900px; margin: 40px auto; background: #f5f5f5; }
        h1 { color: #003087; }
        .meta { color: #666; font-size: 13px; margin-bottom: 30px; }
        section { background: white; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
        h2 { font-size: 14px; color: #555; margin: 0 0 16px; }
        .preview-frame { border: 1px dashed #ddd; border-radius: 4px; padding: 16px; background: #fff; width: 400px; }
        .logs { font-size: 11px; color: #c00; margin-top: 12px; background: #fff5f5; padding: 8px; border-radius: 4px; }
        .bundle-info { background: #e8f4e8; padding: 12px 16px; border-radius: 6px; font-size: 13px; margin-bottom: 24px; }
    </style>
</head>
<body>
    <h1>renderV2Message SSR Preview</h1>
    <div class="bundle-info">
        Bundle: <strong>${BUNDLE_URL}</strong><br>
        Version: <strong>${mod.version}</strong>
    </div>
    ${sections}
</body>
</html>`;
}

async function main() {
    console.log(`Fetching bundle from CDN (${STAGE_TAG})...`);
    const code = await fetchBundle(BUNDLE_URL);
    const mod = evalBundle(code);
    console.log(`Bundle loaded — version: ${mod.version}`);

    const server = http.createServer(async (req, res) => {
        const page = await buildPage(mod);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(page);
    });

    server.listen(PORT, () => {
        console.log(`\n  Preview ready → http://localhost:${PORT}\n`);
    });
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
