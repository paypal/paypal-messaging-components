import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupAPI } from './setupAPI';
import * as config from '../../../config/index';

import { openShortTermView, donutsShowCorrectPayment } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'api';
const testFileName = 'shortTerm';

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
