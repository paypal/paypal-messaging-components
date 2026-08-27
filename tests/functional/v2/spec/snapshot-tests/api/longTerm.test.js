import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupAPI } from './setupAPI';
import * as config from '../../../config/index';

import {
    belowThresholdErr,
    aboveThresholdErr,
    updateTermsViaCalc,
    showCorrectOfferBreakdown,
    showCorrectAPRDisclaimer,
    showCorrectOfferInfo,
    showCorrectOfferInfoAccordion,
    showCorrectOfferBreakdownAccordion,
    updateOfferAccordionTermsViaCalc
} from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'api';
const testFileName = 'longTerm';
const DARK_MODE_ACCOUNTS = ['DEV_US_APPLE_LONG_TERM_PL2GO'];
// Regular APR accordion accounts (DE, AT, ES, IT)
const REGULAR_APR_ACCORDION_ACCOUNTS = [
    'DEV_DE_LONG_TERM',
    'DEV_DE_LONG_TERM_EN',
    'DEV_AT_LONG_TERM',
    'DEV_ES_LONG_TERM',
    'DEV_ES_LONG_TERM_0APR',
    'DEV_IT_LONG_TERM',
    'DEV_IT_LONG_TERM_0APR'
];

// 0% APR accordion accounts (DE, AT)
const ZERO_APR_ACCORDION_ACCOUNTS = ['DEV_DE_LONG_TERM_0APR', 'DEV_DE_LONG_TERM_EN_0APR', 'DEV_AT_LONG_TERM_0APR'];

// Combined list for exclusion from offer cards tests
const ALL_ACCORDION_ACCOUNTS = [...REGULAR_APR_ACCORDION_ACCOUNTS, ...ZERO_APR_ACCORDION_ACCOUNTS];

const runTest = ACCOUNT_CONFIG.testFileName === testFileName;
const descFn = runTest ? describe : describe.skip;
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupAPI(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
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
        } else if (amount >= minAmount && amount <= maxAmount && !ALL_ACCORDION_ACCOUNTS.includes(account)) {
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

            test(`Amount:${amount} - Displays correct APR legal disclaimer - ${viewport}`, async () => {
                await showCorrectAPRDisclaimer(
                    modalFrame,
                    modalContent,
                    getTestName(country, integration, account, amount, viewport)
                );
            });

            if (DARK_MODE_ACCOUNTS.includes(account)) {
                test(`Amount:${amount} - Offer cards show correct payment headline information in dark mode - ${viewport}`, async () => {
                    ({ modalFrame } = await setupAPI(viewport, account, amount, { features: 'use-dark-mode' }));
                    await showCorrectOfferInfo(
                        modalFrame,
                        modalContent,
                        getTestName(country, integration, account, amount, viewport)
                    );
                });
            }
        }
        if (amount >= minAmount && amount <= maxAmount && REGULAR_APR_ACCORDION_ACCOUNTS.includes(account)) {
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

        if (amount >= minAmount && amount <= maxAmount && ZERO_APR_ACCORDION_ACCOUNTS.includes(account)) {
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
