import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupWebpage } from './setupWebpage';
import * as config from '../../../config/index';

import { openShortTermView, donutsShowCorrectPayment } from '../../../testFn';

const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'webpage';

const descFn = ACCOUNT_CONFIG.testFileName === 'shortTerm' ? describe : describe.skip;

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
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
