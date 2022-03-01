import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupSDK } from './setupSDK';
import * as config from '../../../config/index';

import {
    belowThresholdErr,
    aboveThresholdErr,
    updateTermsViaCalc,
    showCorrectOfferBreakdown,
    showCorrectAPRDisclaimer,
    showCorrectOfferInfo
} from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'sdk';
const testFileName = 'longTerm';

const runTest = ACCOUNT_CONFIG.testFileName === testFileName;
const descFn = runTest ? describe : describe.skip; // eslint-disable-line no-unused-vars
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

// TODO: Switch to descFn once pay monthly messages are complete
describe.skip.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - SDK Modal - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupSDK(viewport, account, amount));
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
