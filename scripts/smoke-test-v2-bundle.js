#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Smoke test for renderV2Message.js stage bundle.
 * Downloads the bundle from CDN and exercises it like CPNW would.
 *
 * Usage:
 *   node scripts/smoke-test-v2-bundle.js [stageTag]
 *   node scripts/smoke-test-v2-bundle.js render_v2_msg
 */

const https = require('https');

const STAGE_TAG = process.argv[2] || 'render_v2_msg';
const BUNDLE_URL = `https://cdn-${STAGE_TAG}.static.engineering.dev.paypalinc.com/upstream/bizcomponents/stage/renderV2Message.js`;

const SAMPLE_V2_RESPONSE = {
    messages: [
        {
            preferred_message: {
                content: {
                    main_items: [
                        {
                            type: 'IMAGE',
                            name: 'paypal_logo',
                            source_url: 'https://www.paypalobjects.com/upstream/assets/logos/v2/paypal_wordmark.svg',
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
                    ],
                    disclaimer_items: [{ type: 'TEXT', text: 'Subject to credit approval.' }]
                }
            }
        }
    ]
};

const SAMPLE_OPTIONS = {
    style: { layout: 'text', logo: { type: 'primary', position: 'left' }, text: { color: 'black' } },
    amount: 100,
    currency: 'USD',
    locale: 'en_US',
    buyerCountry: 'US'
};

function fetch(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, res => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
                    return;
                }
                const chunks = [];
                res.on('data', chunk => chunks.push(chunk));
                res.on('end', () => resolve(Buffer.concat(chunks).toString()));
                res.on('error', reject);
            })
            .on('error', reject);
    });
}

/** Evaluate CommonJS bundle and return its exports — same approach as CPNW's ivm eval */
function evalBundle(code) {
    const exports = {};
    const mod = { exports };
    // eslint-disable-next-line no-new-func
    const wrapper = new Function('exports', 'module', 'require', code);
    wrapper(exports, mod, require);
    return mod.exports;
}

function extractPreferredContent(response) {
    return response?.messages?.[0]?.preferred_message?.content || {};
}

async function main() {
    console.log(`\nFetching bundle from CDN...`);
    console.log(`  URL: ${BUNDLE_URL}\n`);

    let code;
    try {
        code = await fetch(BUNDLE_URL);
        console.log(`✓ Bundle fetched (${(code.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
        console.error(`✗ Failed to fetch bundle: ${err.message}`);
        process.exit(1);
    }

    let bundleExports;
    try {
        bundleExports = evalBundle(code);
        console.log(`✓ Bundle evaluated`);
    } catch (err) {
        console.error(`✗ Bundle eval failed: ${err.message}`);
        process.exit(1);
    }

    // CPNW namespace is exports.renderV2Message
    const mod = bundleExports.renderV2Message || bundleExports;

    // 1. Check exports
    const requiredExports = ['render', 'validateStyle', 'getParentStyles', 'version'];
    const missing = requiredExports.filter(k => typeof mod[k] === 'undefined');
    if (missing.length) {
        console.error(`✗ Missing exports: ${missing.join(', ')}`);
        process.exit(1);
    }
    console.log(`✓ All required exports present: ${requiredExports.join(', ')}`);
    console.log(`  Bundle version: ${mod.version}`);

    // 2. validateStyle
    const logs = [];
    const addLog = msg => logs.push(msg);
    const validatedStyle = mod.validateStyle(addLog, SAMPLE_OPTIONS.style);
    if (!validatedStyle || validatedStyle.layout !== 'text') {
        console.error(`✗ validateStyle returned unexpected result: ${JSON.stringify(validatedStyle)}`);
        process.exit(1);
    }
    console.log(`✓ validateStyle works — layout: ${validatedStyle.layout}`);

    // 3. validateStyle with invalid layout (should fall back to 'text')
    logs.length = 0;
    const fallback = mod.validateStyle(addLog, { layout: 'invalid_layout' });
    if (!fallback || fallback.layout !== 'text') {
        console.error(`✗ validateStyle fallback failed: ${JSON.stringify(fallback)}`);
        process.exit(1);
    }
    if (!logs.some(l => l.includes('invalid_layout') || l.includes('Invalid'))) {
        console.error(`✗ validateStyle did not log warning for invalid layout`);
        process.exit(1);
    }
    console.log(`✓ validateStyle falls back to 'text' for invalid layout`);

    // 4. validateStyle rejects 'custom' layout
    logs.length = 0;
    const customFallback = mod.validateStyle(addLog, { layout: 'custom' });
    if (!customFallback || customFallback.layout !== 'text') {
        console.error(`✗ validateStyle did not fall back from 'custom': ${JSON.stringify(customFallback)}`);
        process.exit(1);
    }
    console.log(`✓ validateStyle rejects 'custom' layout and falls back to 'text'`);

    // 5. render — produce HTML
    let html;
    try {
        html = mod.render(SAMPLE_OPTIONS, extractPreferredContent(SAMPLE_V2_RESPONSE), addLog);
    } catch (err) {
        console.error(`✗ render() threw: ${err.message}`);
        process.exit(1);
    }
    if (typeof html !== 'string' || html.length === 0) {
        console.error(`✗ render() returned empty or non-string output`);
        process.exit(1);
    }
    console.log(`✓ render() produced HTML (${html.length} chars)`);

    // 6. Check HTML structure
    const checks = [
        ['class="pp-message"', 'contains pp-message root'],
        ['class="main', 'contains main span'],
        ['Buy now, pay later.', 'contains main_items text content']
    ];
    checks.forEach(([needle, label]) => {
        if (!html.includes(needle)) {
            console.error(`✗ HTML missing: ${label} (looked for "${needle}")`);
            process.exit(1);
        }
        console.log(`✓ HTML ${label}`);
    });

    // 7. getParentStyles
    try {
        const styles = mod.getParentStyles(validatedStyle);
        if (typeof styles !== 'string') {
            console.error(`✗ getParentStyles returned non-string: ${typeof styles}`);
            process.exit(1);
        }
        console.log(`✓ getParentStyles returns CSS string (${styles.length} chars)`);
    } catch (err) {
        console.error(`✗ getParentStyles threw: ${err.message}`);
        process.exit(1);
    }

    console.log('\n✓ All smoke tests passed!\n');
}

main().catch(err => {
    console.error('\nUnhandled error:', err);
    process.exit(1);
});
