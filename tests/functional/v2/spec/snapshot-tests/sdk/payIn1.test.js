import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupSDK } from './setupSDK';
import * as config from '../../../config/index';

import { openPayIn1View } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'sdk';
const testFileName = 'payIn1';

const runTest = ACCOUNT_CONFIG.testFileName === testFileName;
const descFn = runTest ? describe : describe.skip;
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - SDK Modal - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupSDK(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Shows correct subheadline for amount - ${viewport}`, async () => {
            await openPayIn1View(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });
    }
);
