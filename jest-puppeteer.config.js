module.exports = {
    launch: {
        headless: false,
        devtools: false,
        // dumpio pipes browser stdout and stderr to process stdout and stderr
        dumpio: true
        // slows puppeteer in milliseconds so you can see what is going on
        // slowMo: 5 * 1000
    },
    browser: 'chromium',
    browserContext: 'default'
};
