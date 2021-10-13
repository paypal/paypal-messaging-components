const process = require('process');

if (!process.env.ARG) process.env.ARG = process.argv.pop().replace('--', '');

const DESKTOP_EMULATION_METRICS = {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false
};

const desktopDense4G = {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0, // 0 means unset
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0
};

module.exports = {
    ci: {
        collect: {
            numberOfRuns: 3,
            url: [
                `${process.env.LIGHTHOUSE_URL}/?env=stage${
                    process.env.STAGE_TAG ? `&stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/category/jewelry?env=stage${
                    process.env.STAGE_TAG ? `&stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/product/7?env=stage${
                    process.env.STAGE_TAG ? `&stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/cart?env=stage${
                    process.env.STAGE_TAG ? `&stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/checkout?env=stage${
                    process.env.STAGE_TAG ? `&stage_tag=${process.env.STAGE_TAG}` : ''
                }`
            ],
            settings: {
                preset: 'desktop',
                output: 'json',
                maxWaitForLoad: 10000,
                chromeFlags: '--no-sandbox --disable-storage-reset --disable-dev-shm-usage --in-process-gpu',
                formFactor: 'desktop',
                throttling: desktopDense4G,
                screenEmulation: DESKTOP_EMULATION_METRICS,
                emulatedUserAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Safari/537.36 Chrome-Lighthouse'
            },
            psiStrategy: 'desktop'
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
};
