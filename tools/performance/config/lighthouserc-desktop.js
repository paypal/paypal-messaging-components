const process = require('process');

if (!process.env.ARG) process.env.ARG = process.argv.pop().replace('--', '');

module.exports = {
    ci: {
        collect: {
            numberOfRuns: 2,
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
                preset: 'desktop',
                output: 'json',
                maxWaitForLoad: 10000,
                chromeFlags: '--no-sandbox --disable-storage-reset --disable-dev-shm-usage --in-process-gpu'
            },
            psiStrategy: 'desktop'
        },
        upload: {
            target: 'filesystem',
            outputDir: 'lighthouse',
            reportFilenamePattern: 'desktop-report-%%PATHNAME%%-%%DATETIME%%.%%EXTENSION%%'
        }
    }
};
