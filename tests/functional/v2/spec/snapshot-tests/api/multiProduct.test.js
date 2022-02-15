import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupAPI } from './setupAPI';
import * as config from '../../../config/index';

import { openProductListView, clickProductListTiles, viewsShareAmount } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const integration = 'api';

describe.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - API Modal Iframe - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupAPI(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
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
    }
);
