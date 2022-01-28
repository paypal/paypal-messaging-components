import { selectors, screenDimensions, filterPermutations, getTestName, logTestName } from '../utils/index';
import { US, IT } from '../config/index';
import {
    openProductListView,
    clickProductListTiles,
    openShortTermView,
    donutsShowCorrectPayment,
    openNoInterestView,
    openTermsPage,
    belowThresholdErr,
    aboveThresholdErr,
    updateTermsViaCalc,
    showCorrectOfferBreakdown,
    showCorrectAPRDisclaimer,
    showCorrectOfferInfo,
    openCreditApplicationLogin,
    viewsShareAmount
} from '../testFn';

const {
    modal: { apiIframe }
} = selectors;

let apiIframeEl;
let modalFrame;
const integration = 'api';

const setupAPI = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    const { width, height } = screenDimensions[viewport];
    await page.goto(
        `https://localhost.paypal.com:8080/snapshot/v2/api.html?account=${account}&amount=${amount}&width=${width}&height=${height}`
    );

    apiIframeEl = await page.waitForSelector(apiIframe, {
        visible: true
    });
    modalFrame = await apiIframeEl.contentFrame();

    await page.waitFor(5 * 1000);
};

const formatTestMessage = ({ amount, viewport, description }) => {
    return [`Amount:${amount}`.padEnd(14), `${viewport}`.padEnd(7), `${description}`].join(' - ');
};

// Multi-product
describe.each(filterPermutations([US], ['DEV_US_MULTI']))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupAPI(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(formatTestMessage({ amount, viewport, description: `Opens to product list view` }), async () => {
            await openProductListView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(
            formatTestMessage({ amount, viewport, description: `Product list tiles send user to correct view` }),
            async () => {
                await clickProductListTiles(modalFrame, modalContent);
            }
        );

        test(formatTestMessage({ amount, viewport, description: `Amount persists between views` }), async () => {
            await viewsShareAmount(modalFrame, getTestName(country, integration, account, amount, viewport));
        });
    }
);

// Short term
describe.each(filterPermutations([US, IT], ['DEV_US_SHORT_TERM', 'DEV_IT_SHORT_TERM']))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupAPI(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(formatTestMessage({ amount, viewport, description: `Shows correct subheadline for amount` }), async () => {
            await openShortTermView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(
            formatTestMessage({ amount, viewport, description: `Donuts show correct periodic payment for amount` }),
            async () => {
                await donutsShowCorrectPayment(
                    amount,
                    minAmount,
                    maxAmount,
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            }
        );
    }
);

// Long term
describe.each(filterPermutations([US], ['DEV_US_LONG_TERM']))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupAPI(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        if (amount < minAmount) {
            test(
                formatTestMessage({
                    amount,
                    viewport,
                    description: `Amounts below ${minAmount} show correct below threshold warning`
                }),
                async () => {
                    await belowThresholdErr(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                }
            );
        } else if (amount > maxAmount) {
            test(
                formatTestMessage({
                    amount,
                    viewport,
                    description: `Amounts above ${maxAmount} show correct above threshold warning`
                }),
                async () => {
                    await aboveThresholdErr(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                }
            );
        } else {
            test(
                formatTestMessage({
                    amount,
                    viewport,
                    description: `Offer cards show correct payment headline information`
                }),
                async () => {
                    await showCorrectOfferInfo(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                }
            );

            test(
                formatTestMessage({
                    amount,
                    viewport,
                    description: `Offer cards show correct payment breakdown information for amount`
                }),
                async () => {
                    await showCorrectOfferBreakdown(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                }
            );

            test(formatTestMessage({ amount, viewport, description: `Update offers via calculator` }), async () => {
                await updateTermsViaCalc(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(
                formatTestMessage({ amount, viewport, description: `Displays correct APR legal disclaimer` }),
                async () => {
                    await showCorrectAPRDisclaimer(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                }
            );
        }
    }
);

// No Interest
describe.each(filterPermutations([US], ['DEV_US_NO_INTEREST']))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupAPI(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(formatTestMessage({ amount, viewport, description: `Shows correct content for amount` }), async () => {
            await openNoInterestView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(formatTestMessage({ amount, viewport, description: `Click to see T&Cs` }), async () => {
            await openTermsPage(modalFrame);
        });

        test(
            formatTestMessage({
                amount,
                viewport,
                description: `Clicking apply now button goes to credit application for amount`
            }),
            async () => {
                await openCreditApplicationLogin(modalFrame);
            }
        );
    }
);
