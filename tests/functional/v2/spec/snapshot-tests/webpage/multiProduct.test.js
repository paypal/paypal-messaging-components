import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupWebpage } from './setupWebpage';
import * as config from '../../../config/index';

import { openProductListView, clickProductListTiles, viewsShareAmount } from '../../../testFn';

const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'webpage';

const descFn = ACCOUNT_CONFIG.testFileName === 'multiProduct' ? describe : describe.skip;

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
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
