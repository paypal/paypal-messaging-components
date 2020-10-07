module.exports = {
    launch: {
        headless: true,
        devtools: false,
        // dumpio pipes browser stdout and stderr to process stdout and stderr
        dumpio: true,
        // slows puppeteer in milliseconds so you can see what is going on
        // slowMo: 5 * 1000
        ignoreHTTPSErrors: true
    },
    browser: 'chromium',
    browserContext: 'default'
};
