const showBrowser = process.env.HEADLESS === 'false';

module.exports = {
    server: {
        command: 'npm run dev:ci',
        host: 'localhost.paypal.com',
        port: 8080,
        protocol: 'https',
        launchTimeout: 180000,
        usedPortAction: 'ignore'
    },
    launch: {
        headless: !showBrowser,
        devtools: showBrowser,
        // dumpio pipes browser stdout and stderr to process stdout and stderr
        // dumpio: true,
        // slows puppeteer in milliseconds so you can see what is going on
        slowMo: showBrowser ? 50 : 0,
        ignoreHTTPSErrors: true,
        args: [
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list'
        ]
    },
    browser: 'chromium',
    browserContext: 'default',
    exitOnPageError: false
};
