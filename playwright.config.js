// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests/playwright/practice-tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://127.0.0.1:8080',
        ignoreHTTPSErrors: true,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry'
    },
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    // retries: 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },

        /* Test against mobile viewports. */
        {
            name: 'Mobile Chrome',
            use: {
                ...devices['Pixel 5'],
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 12'],
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },

        /* Test against branded browsers. */
        {
            name: 'Microsoft Edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        },
        {
            name: 'Google Chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security']
                }
            }
        }
    ],
    webServer: [
        {
            command: './.github/scripts/runServerV2.sh',
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI
        }
    ]
});
