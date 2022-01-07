import { selectors, screenDimensions, filterPermutations, getTestName, logTestName } from '../utils/index';
import { US } from '../config/index';

import {
    openProductListView,
    clickProductListTiles,
    closeModalViaXBtn,
    closeModalViaEscKey,
    closeModalViaOverlay,
    closeAndReopenModal,
    openShortTermView,
    donutsShowCorrectPayment,
    openNoInterestView,
    openTermsPage,
    belowThresholdErr,
    aboveThresholdErr,
    openCreditApplicationLogin,
    viewsShareAmount,
    updateTermsViaCalc,
    showCorrectAPRDisclaimer,
    showCorrectOfferInfo,
    showCorrectOfferBreakdown,
    showCorrectXOButtonContent
} from '../testFn';

const {
    standaloneLearnMore,
    modal: { iframe }
} = selectors;

let zoidModalIframeEl;
let modalFrame;
const integration = 'standalone';

const setupStandalone = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    await page.goto(
        `https://localhost.paypal.com:8080/snapshot/v2/standalone-modal.html?account=${account}&amount=${amount}`
    );
    const learnMoreButton = await page.waitForSelector(standaloneLearnMore);
    await learnMoreButton.click();

    zoidModalIframeEl = await page.waitForSelector(iframe, { visible: true });
    modalFrame = await zoidModalIframeEl.contentFrame();

    await page.waitFor(5 * 1000);
};

// Multi-product
describe.each(filterPermutations([US], ['DEV_US_MULTI']))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupStandalone(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Opens to product list view - ${viewport}`, async () => {
            await openProductListView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Product list tiles send user to correct view - ${viewport}`, async () => {
            await clickProductListTiles(modalFrame, modalContent);
        });

        test(`Amount:${amount} - Amount persists between views - ${viewport}`, async () => {
            await viewsShareAmount(modalFrame, getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - X button closes modal - ${viewport}`, async () => {
            await closeModalViaXBtn(modalFrame, modalContent);
        });

        test(`Amount:${amount} - Esc key closes modal - ${viewport}`, async () => {
            await closeModalViaEscKey(modalFrame);
        });

        if (viewport === 'desktop') {
            test(`Amount:${amount} - Overlay closes modal - ${viewport}`, async () => {
                await closeModalViaOverlay(modalFrame);
            });
        }

        test(`Amount:${amount} - Close and reopen the modal - ${viewport}`, async () => {
            await closeAndReopenModal(modalFrame, integration);
        });
    }
);

// Short term
describe.each(filterPermutations([US], ['DEV_US_SHORT_TERM']))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupStandalone(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Shows correct subheadline for amount - ${viewport}`, async () => {
            await openShortTermView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Donuts show correct periodic payment for amount - ${viewport}`, async () => {
            await donutsShowCorrectPayment(
                amount,
                minAmount,
                maxAmount,
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });
    }
);

// Long term
describe.each(filterPermutations([US], ['DEV_US_LONG_TERM', 'DEV_US_LONG_TERM_CHECKOUT']))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            await setupStandalone(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        if (amount < minAmount) {
            test(`Amount:${amount} - Amounts below ${minAmount} show correct below threshold warning - ${viewport}`, async () => {
                await belowThresholdErr(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        } else if (amount > maxAmount) {
            test(`Amount:${amount} - Amounts above ${maxAmount} show correct above threshold warning - ${viewport}`, async () => {
                await aboveThresholdErr(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        } else {
            test(`Amount:${amount} - Offer cards show correct payment headline information - ${viewport}`, async () => {
                await showCorrectOfferInfo(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Offer cards show correct payment breakdown information for amount - ${viewport}`, async () => {
                await showCorrectOfferBreakdown(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Update offers via calculator - ${viewport}`, async () => {
                await updateTermsViaCalc(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            if (account === 'DEV_US_LONG_TERM_CHECKOUT') {
                test(`Amount:${amount} - Checkout CTA button shows correct content - ${viewport}`, async () => {
                    await showCorrectXOButtonContent(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                });
            }

            test(`Amount:${amount} - Displays correct APR legal disclaimer - ${viewport}`, async () => {
                await showCorrectAPRDisclaimer(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        }
    }
);

// No Interest
describe.each(filterPermutations([US], ['DEV_US_NO_INTEREST']))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            await setupStandalone(viewport, account, amount);
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Shows correct content for amount - ${viewport}`, async () => {
            await openNoInterestView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Click to see T&Cs - ${viewport}`, async () => {
            await openTermsPage(modalFrame, getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Clicking apply now button goes to credit application for amount - ${viewport}`, async () => {
            await openCreditApplicationLogin(modalFrame, getTestName(country, integration, account, amount, viewport));
        });
    }
);
