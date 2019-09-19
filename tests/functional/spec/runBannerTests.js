/* istanbul ignore file */
// import got from 'got';
import path from 'path';
import puppeteer from 'puppeteer';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

// These tests are run using a Docker container running Chromium. To setup, you will need to have Docker installed. Run the command
// npm run test:docker:build
// This will build the docker image called chromium. Then, the tests can be run using the other npm scripts
// test:func, test:func:fast, test:func:snapshot:update

// RUNLOCAL=1 will run outside of container, turn off headless mode, automatically open devtools, and pause for 10 seconds on each page load
// const USE_DOCKER = process.env.RUNLOCAL !== '1';

// URL=<PATH_TO_MESSAGING_JS> will pull messaging.js from a custom URL (but still point to local versions of the banners)
const MESSAGING_URL = process.env.URL;

// Update  this value to restrict debugging to the selected single offer type (single instance of Chromium)
// const DEBUG_OFFER_TYPE =  ['DEV00000000NI','DEV000NINONUS','DEV0000000EAZ','DEV0000000EAG','DEV0000000PSZ','DEV0000000PSG','DEV0000000PMZ','DEV0000000PMG'];

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

const SCREENSHOT_ROOT = path.resolve(__dirname, '../banners');

const testPageUrl = 'http://localhost.paypal.com:8080';

// Comment out to skip testing certain banner types
// prettier-ignore
const bannerTypes = [
    'text',
    'flex',
    'legacyNI',
    'legacyEZP'
];

// Comment out to skip testing certain offer types
const offerTypes = {
    DEV00000000NI: 'ni',
    DEV000NINONUS: 'ni:non-us',
    DEV0000000EAZ: 'ezp:any:eqz',
    DEV0000000EAG: 'ezp:any:gtz',
    DEV0000000PSZ: 'pala:single:eqz',
    DEV0000000PSG: 'pala:single:gtz',
    DEV0000000PMZ: 'pala:multi:eqz',
    DEV0000000PMG: 'pala:multi:gtz'
};

/* const getSizes = max =>
    new Array(max / 50 - 1)
        .fill(null)
        .map((val, idx) => (idx + 2) * 50)
        .reverse(); */

const bannerTypeConfigs = {
    text: {
        height: 100,
        config: {
            layout: 'text'
        },
        permutations: {
            'logo.type': ['primary', 'alternative', 'inline'],
            'logo.position': ['top', 'left', 'right'],
            'text.color': ['black', 'white']
        },
        sizeConfig: {
            /* quick: [600, 300, 100],
            full: getSizes(600) */
            medium: [600]
        }
    },
    flex: {
        height: 700,
        config: {
            layout: 'flex'
        },
        permutations: {
            color: ['blue', 'black', 'white', 'white-no-border'],
            ratio: ['1x1', '1x4', '8x1', '20x1']
        },
        sizeConfig: {
            /* quick: [1200, 800, 300, 100],
            full: getSizes(1200) */
            medium: [600]
        }
    },
    legacyNI: {
        includeOfferTypes: ['DEV00000000NI'],
        height: 400,
        config: {
            layout: 'legacy',
            _legacy: true,
            style: {
                typeNI: 'html'
            }
        },
        permutations: {
            size: ['168x374', '340x60', '765x60', '1000x50', '234x100', '1000x36', '310x100']
        },
        sizeConfig: {
            /* quick: [1100, 800, 300, 100],
            full: getSizes(1100) */
            medium: [600]
        }
    },
    legacyEZP: {
        includeOfferTypes: [
            'DEV0000000EAZ',
            'DEV0000000EAG',
            'DEV0000000PSZ',
            'DEV0000000PSG',
            'DEV0000000PMZ',
            'DEV0000000PMG'
        ],
        height: 300,
        config: {
            layout: 'legacy',
            _legacy: true,
            style: {
                typeEZP: 'html'
            }
        },
        permutations: {
            size: [
                '1000x36',
                '120x90',
                '234x60',
                '250x250',
                '300x50',
                '340x60',
                '468x60',
                '728x90',
                '170x100',
                '540x200'
            ]
        },
        sizeConfig: {
            /* quick: [1100, 800, 300, 100],
            full: getSizes(1100) */
            medium: [600]
        }
    }
};

const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

const tryScreenshot = (page, config, retryCount = 0) =>
    page.screenshot(config).catch(() => {
        if (retryCount > 0) {
            console.error(`Screenshot failed, retrying (${retryCount})`);
            return tryScreenshot(page, config, retryCount - 1);
        }

        return null;
    });

const getSnapshotDir = (config, permutation) =>
    `${SCREENSHOT_ROOT}/${offerTypes[config.account]}/${permutation.join('/')}/`.replace(/:/g, '_');

const waitForBanner = async (page, timeout) => {
    try {
        await page.waitForFunction(
            () => {
                const el = document.querySelector('[data-pp-id] iframe');
                return el && el.clientHeight !== 0;
            },
            {
                polling: 10,
                timeout
            }
        );
    } catch (e) {
        // Do nothing
    }
};

const testContainerSizes = async (page, config, sizes, height, permutation) => {
    await page.goto(`${testPageUrl}/container_size.html?config=${JSON.stringify(config)}&height=${height}`).catch(e => {
        throw e;
    });

    await page.setViewport({
        width: 1200,
        height
    });

    await sleep(1000);

    return sizes.reduce(
        (accumulator, size) =>
            accumulator.then(async () => {
                await page.evaluate(containerSize => window.setSize(containerSize), size);

                await waitForBanner(page, 1000);

                await sleep(500);

                const image = await tryScreenshot(
                    page,
                    {
                        clip: {
                            x: 0,
                            y: 0,
                            width: size,
                            height
                        }
                    },
                    3
                );

                if (image) {
                    expect(image).toMatchImageSnapshot({
                        customSnapshotsDir: getSnapshotDir(config, permutation),
                        customSnapshotIdentifier: `container-${size}`
                    });
                } else {
                    console.error(`Screenshot failed for ${JSON.stringify(config)} at ${size}px container`);
                }
            }),
        Promise.resolve()
    );
};

const testBrowserSizes = async (page, config, sizes, height, permutation) => {
    await page.goto(`${testPageUrl}/browser_size.html?config=${JSON.stringify(config)}&height=${height}`).catch(e => {
        throw e;
    });

    await page.setViewport({
        width: 1200,
        height
    });

    await waitForBanner(page, 1000);

    await sleep(1000);

    return sizes.reduce(
        (accumulator, size) =>
            accumulator.then(async () => {
                await page.setViewport({
                    width: size,
                    height
                });

                await sleep(100);

                const image = await tryScreenshot(page, undefined, 3);

                if (image) {
                    expect(image).toMatchImageSnapshot({
                        customSnapshotsDir: getSnapshotDir(config, permutation),
                        customSnapshotIdentifier: `browser-${size}`
                    });
                } else {
                    console.error(`Screenshot failed for ${JSON.stringify(config)} at ${size}px browser`);
                }
            }),
        Promise.resolve()
    );
};

const setNestedProperty = (obj, key, value) => {
    const parts = key.split('.');
    const newObj = { ...obj };

    parts.reduce((accumulator, target, idx) => {
        if (idx === parts.length - 1) {
            accumulator[target] = value;
            return accumulator;
        }

        accumulator[target] = { ...accumulator[target] } || {};
        return accumulator[target];
    }, newObj);

    return newObj;
};

export default function runBannerTests(account) {
    let browser;
    let page;

    const initBrowser = async () => {
        browser = null;
        page = null;

        /* if (USE_DOCKER) {
            try {
                const result = await got('http://127.0.0.1:9222/json/version', { json: true });

                browser = await puppeteer.connect({
                    browserWSEndpoint: result.body.webSocketDebuggerUrl,
                    ignoreHTTPSErrors: true
                });
            } catch (e) {
                throw new Error('Could not connect to Chromium - is Docker container running?');
            }
        } else { */
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: true,
            devtools: true
        });
        // }

        page = await browser.newPage();

        page.setRequestInterception(true);

        page.on('request', request => {
            const url = request.url();

            // Re-route requests to proxy imadserv
            if (url.includes('https://www.paypal.com/imadserver/upstream')) {
                const hostName = 'http://localhost.paypal.com:8080';
                return request.continue({
                    url: url.replace(
                        'https://www.paypal.com/imadserver/upstream',
                        `${hostName}/proxy/imadserver/upstream`
                    )
                });
            }

            // If a custom messaging.js url is passed in, reroute the request to that url
            if (url.includes('messaging.js') && MESSAGING_URL !== undefined) {
                return request.continue({
                    url: MESSAGING_URL
                });
            }

            const blocked = [
                'messagingLogger',
                '$impression_tracking_url$',
                '$click_tracking_url$',
                'favicon.ico',
                'finance/terms/data'
            ];

            if (blocked.some(part => url.indexOf(part) !== -1)) {
                return request.respond({
                    status: 204,
                    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' }
                });
            }

            return request.continue();
        });

        page.on('requestfailed', err => console.log(err.url()));
        // page.on('console', msg => console.log(msg));

        page.on('pageerror', err => {
            console.error('Browser error occurred');
            throw err;
        });

        page.on('error', err => {
            console.error('Browser error occurred');
            throw err;
        });
    };

    beforeAll(initBrowser, 30000);

    Object.keys(bannerTypeConfigs).forEach(bannerType => {
        if (!bannerTypes.includes(bannerType)) {
            test.skip(`Skipping ${bannerType} for ${offerTypes[account]}`, () => {});
            return;
        }

        const { height, config, permutations, includeOfferTypes, sizeConfig } = bannerTypeConfigs[bannerType];
        const { layout } = config;
        // Some layout types may not support all offer types
        if (includeOfferTypes && !includeOfferTypes.includes(account)) {
            test.skip(`Skipping ${layout} for ${offerTypes[account]}`, () => {});
            return;
        }

        // const sizes = process.env.QUICK === '1' ? sizeConfig.quick : sizeConfig.full;
        const sizes = sizeConfig.medium;

        const testPermutations = (keys, style = { layout }, permutation = [`layout:${layout}`]) => {
            const currentKey = keys[0];
            if (!currentKey) {
                test(`${offerTypes[account]} - ${permutation.join(' - ')}`, async () => {
                    const totalConfig = {
                        ...config,
                        account,
                        amount: 300,
                        style: {
                            ...config.style,
                            ...style
                        }
                    };

                    if (!browser || !page) {
                        throw new Error(`No browser/page: ${JSON.stringify(totalConfig)}`);
                    }

                    const tryTests = async (/* retryCount = 0 */) => {
                        try {
                            await testContainerSizes(page, totalConfig, sizes, height, permutation);
                            await testBrowserSizes(page, totalConfig, sizes, height, permutation);
                        } catch (e) {
                            if (e.message.indexOf('Expected image to') !== -1) {
                                throw e;
                            }

                            /* if (USE_DOCKER && retryCount > 0) {
                                console.error(
                                    `Re-initializing Puppeteer: ${JSON.stringify(totalConfig)} (${retryCount})`
                                );
                                await initBrowser();
                                await tryTests(retryCount - 1);
                            } else { */
                            browser = null;
                            page = null;
                            throw e;
                            // }
                        }
                    };

                    await tryTests(3);
                }, 100000);
                return;
            }

            permutations[currentKey].forEach(value => {
                testPermutations(keys.slice(1), setNestedProperty(style, currentKey, value), [
                    ...permutation,
                    `${currentKey}:${value}`
                ]);
            });
        };

        testPermutations(Object.keys(permutations));
    });

    afterAll(async () => {
        /* if (USE_DOCKER) {
            await browser.disconnect();
        } else { */
        await browser.close();
        // }
    });
}
