const process = require('process');

if (!process.env.ARG) process.env.ARG = process.argv.pop().replace('--', '');

const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

const MOTOG4_EMULATION_METRICS = {
    mobile: true,
    width: 360,
    height: 640,
    // Moto G4 is really 3, but a higher value here works against
    // our perf recommendations.
    // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
    deviceScaleFactor: 2.625,
    disabled: false
};

const mobileRegular3G = {
    rttMs: 300,
    throughputKbps: 700,
    requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 4
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
                formFactor: 'mobile',
                throttling: mobileRegular3G,
                screenEmulation: MOTOG4_EMULATION_METRICS,
                emulatedUserAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Safari/537.36 Chrome-Lighthouse'
            },
            psiStrategy: 'mobile'
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
};
