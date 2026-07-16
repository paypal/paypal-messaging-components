const showBrowser = process.env.HEADLESS === 'false';

module.exports = {
    launch: {
        headless: !showBrowser,
        devtools: showBrowser,
        // dumpio pipes browser stdout and stderr to process stdout and stderr
        // dumpio: true,
        // slows puppeteer in milliseconds so you can see what is going on
        slowMo: showBrowser ? 50 : 0,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        server: {
            port: 8080
        }
    },
    browser: 'chromium',
    browserContext: 'default'
};
