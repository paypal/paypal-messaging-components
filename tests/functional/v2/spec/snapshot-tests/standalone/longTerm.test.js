import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupStandalone } from './setupStandalone';
import * as config from '../../../config/index';

import {
    belowThresholdErr,
    aboveThresholdErr,
    updateTermsViaCalc,
    showCorrectAPRDisclaimer,
    showCorrectOfferInfo,
    showCorrectOfferBreakdown,
    showCorrectXOButtonContent,
    showCorrectOfferInfoAccordion,
    showCorrectOfferBreakdownAccordion,
    updateOfferAccordionTermsViaCalc
} from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'standalone';
const testFileName = 'longTerm';
const ALL_DE_ACCOUNTS = [
    'DEV_DE_LONG_TERM',
    'DEV_DE_LONG_TERM_0APR',
    'DEV_DE_LONG_TERM_EN',
    'DEV_DE_LONG_TERM_EN_0APR'
];

// includes allows for longTermCheckout
const runTest = ACCOUNT_CONFIG.testFileName.includes(testFileName);
const descFn = runTest ? describe : describe.skip;
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupStandalone(viewport, account, amount));
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
        } else if (amount >= minAmount && amount <= maxAmount && !ALL_DE_ACCOUNTS.includes(account)) {
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
        if (
            amount >= minAmount &&
            amount <= maxAmount &&
            (account === 'DEV_DE_LONG_TERM' || account === 'DEV_DE_LONG_TERM_EN')
        ) {
            test(`Amount:${amount} - Offer accordion show correct payment headline information - ${viewport}`, async () => {
                await showCorrectOfferInfoAccordion(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Offer accordion show correct payment breakdown information for amount - ${viewport}`, async () => {
                await showCorrectOfferBreakdownAccordion(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Update offers via calculator - ${viewport}`, async () => {
                await updateOfferAccordionTermsViaCalc(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        }
        if (
            amount >= minAmount &&
            amount <= maxAmount &&
            (account === 'DEV_DE_LONG_TERM_0APR' || account === 'DEV_DE_LONG_TERM_EN_0APR')
        ) {
            test(`Amount:${amount} - Offer accordion show correct payment headline information - ${viewport}`, async () => {
                await showCorrectOfferInfoAccordion(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Offer accordion show correct payment breakdown information for amount - ${viewport}`, async () => {
                await showCorrectOfferBreakdownAccordion(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            test(`Amount:${amount} - Update offers via calculator - ${viewport}`, async () => {
                await updateOfferAccordionTermsViaCalc(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });
        }
    }
);
