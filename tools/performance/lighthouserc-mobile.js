const process = require('process');

if (!process.env.ARG) process.env.ARG = process.argv.pop().replace('--', '');

// const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
// const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

// const MOTOG4_EMULATION_METRICS = {
//     mobile: true,
//     width: 360,
//     height: 640,
//     // Moto G4 is really 3, but a higher value here works against
//     // our perf recommendations.
//     // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
//     deviceScaleFactor: 2.625,
//     disabled: false
// };

// const mobileRegular3G = {
//     rttMs: 300,
//     throughputKbps: 700,
//     requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
//     downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
//     uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
//     cpuSlowdownMultiplier: 4
// };

module.exports = {
    ci: {
        collect: {
            numberOfRuns: 4,
            url: [
                `${process.env.LIGHTHOUSE_URL}/${process.env.STAGE_TAG ? `?stage_tag=${process.env.STAGE_TAG}` : ''}`,
                `${process.env.LIGHTHOUSE_URL}/category/jewelry${
                    process.env.STAGE_TAG ? `?stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/product/7${
                    process.env.STAGE_TAG ? `?stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/cart${
                    process.env.STAGE_TAG ? `?stage_tag=${process.env.STAGE_TAG}` : ''
                }`,
                `${process.env.LIGHTHOUSE_URL}/checkout${
                    process.env.STAGE_TAG ? `?stage_tag=${process.env.STAGE_TAG}` : ''
                }`
            ],
            settings: {
                // preset: 'desktop',
                output: 'json',
                maxWaitForLoad: 10000,
                chromeFlags: '--no-sandbox --disable-storage-reset --disable-dev-shm-usage --in-process-gpu'
                // formFactor: 'mobile',
                // throttling: mobileRegular3G,
                // screenEmulation: MOTOG4_EMULATION_METRICS,
                // emulatedUserAgent:
                //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Safari/537.36 Chrome-Lighthouse'
            },
            psiStrategy: 'mobile'
        },
        upload: {
            target: 'filesystem',
            outputDir: 'dist',
            reportFilenamePattern: 'mobile-report-%%PATHNAME%%-%%DATETIME%%.%%EXTENSION%%'
        }
    }
};
