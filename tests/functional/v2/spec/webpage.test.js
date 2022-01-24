import { screenDimensions, filterPermutations, getTestName, logTestName } from '../utils/index';
import { US } from '../config/index';

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

const integration = 'webpage';

const setupWebpage = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    await page.goto(
        `https://localhost.paypal.com:8080/credit-presentment/lander/modal?payer_id=${account}&amount=${amount}`
    );
    await page.waitFor(5 * 1000);
};

// Multi-product
describe.each(filterPermutations([US], ['DEV_US_MULTI']))(
    '%s - Lander Webpage - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupWebpage(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Opens to product list view - ${viewport}`, async () => {
            await openProductListView(page, modalContent, getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Product list tiles send user to correct view - ${viewport}`, async () => {
            await clickProductListTiles(page, modalContent);
        });

        test(`Amount:${amount} - Amount persists between views - ${viewport}`, async () => {
            await viewsShareAmount(page, getTestName(country, integration, account, amount, viewport));
        });
    }
);

// Short term
describe.each(filterPermutations([US], ['DEV_US_SHORT_TERM']))(
    '%s - Lander Webpage - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupWebpage(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Shows correct subheadline for amount - ${viewport}`, async () => {
            await openShortTermView(page, modalContent, getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Donuts show correct periodic payment for amount - ${viewport}`, async () => {
            await donutsShowCorrectPayment(
                amount,
                minAmount,
                maxAmount,
                page,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });
    }
);

// Long term
describe.each(filterPermutations([US], ['DEV_US_LONG_TERM']))(
    '%s - Lander Webpage - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupWebpage(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        if (amount < minAmount) {
            test(`Amount:${amount} - Amounts below ${minAmount} show correct below threshold warning - ${viewport}`, async () => {
                await belowThresholdErr(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        } else if (amount > maxAmount) {
            test(`Amount:${amount} - Amounts above ${maxAmount} show correct above threshold warning - ${viewport}`, async () => {
                await aboveThresholdErr(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        } else {
            test(`Amount:${amount} - Offer cards show correct payment headline information - ${viewport}`, async () => {
                await showCorrectOfferInfo(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Offer cards show correct payment breakdown information for amount - ${viewport}`, async () => {
                await showCorrectOfferBreakdown(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Update offers via calculator - ${viewport}`, async () => {
                await updateTermsViaCalc(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Displays correct APR legal disclaimer - ${viewport}`, async () => {
                await showCorrectAPRDisclaimer(
                    page,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        }
    }
);

// No Interest
describe.each(filterPermutations([US], ['DEV_US_NO_INTEREST']))(
    '%s - Lander Webpage - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupWebpage(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Shows correct content for amount - ${viewport}`, async () => {
            await openNoInterestView(page, modalContent, getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Click to see T&Cs - ${viewport}`, async () => {
            await openTermsPage(page);
        });

        test(`Amount:${amount} - Clicking apply now button goes to credit application for amount - ${viewport}`, async () => {
            await openCreditApplicationLogin(page);
        });
    }
);
