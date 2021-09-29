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
                `${process.env.LIGHTHOUSE_URL}/?stage_tag=${process.env.ARG}`,
                `${process.env.LIGHTHOUSE_URL}/category/jewelry?stage_tag=${process.env.ARG}`,
                `${process.env.LIGHTHOUSE_URL}/product/7?stage_tag=${process.env.ARG}`,
                `${process.env.LIGHTHOUSE_URL}/cart?stage_tag=${process.env.ARG}`,
                `${process.env.LIGHTHOUSE_URL}/checkout?stage_tag=${process.env.ARG}`
            ],
            settings: {
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
