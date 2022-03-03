import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupAPI } from './setupAPI';
import * as config from '../../../config/index';

import { openNoInterestView, openTermsPage, openCreditApplicationLogin } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'api';
const testFileName = 'noInterest';

const runTest = ACCOUNT_CONFIG.testFileName === testFileName;
const descFn = runTest ? describe : describe.skip;
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupAPI(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Shows correct content for amount - ${viewport}`, async () => {
            await openNoInterestView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Click to see T&Cs - ${viewport}`, async () => {
            await openTermsPage(modalFrame);
        });

        test(`Amount:${amount} - Clicking apply now button goes to credit application for amount - ${viewport}`, async () => {
            await openCreditApplicationLogin(modalFrame);
        });
    }
);
