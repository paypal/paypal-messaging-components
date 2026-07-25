import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupSDK } from './setupSDK';
import * as config from '../../../config/index';

import {
    openProductListFromModal,
    clickProductListTiles,
    closeModalViaXBtn,
    closeModalViaEscKey,
    closeModalViaOverlay,
    closeAndReopenModal
} from '../../../testFn';

let messageFrame;
let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const ACCOUNT_CONFIG = LOCALE_CONFIG[ACCOUNT];
const integration = 'sdk';
const testFileName = 'multiProductGB';

const runTest = ACCOUNT_CONFIG.testFileName === testFileName;
const descFn = runTest ? describe : describe.skip;
console.info(`${runTest ? 'Running' : 'Skipping'} ${integration}/${testFileName}`); // eslint-disable-line no-console

descFn.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - SDK Modal - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            ({ messageFrame, modalFrame } = await setupSDK(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        test(`Amount:${amount} - Navigates to product list via See other ways link - ${viewport}`, async () => {
            await openProductListFromModal(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Product list tiles send user to correct view - ${viewport}`, async () => {
            await openProductListFromModal(modalFrame, modalContent, null);
            await clickProductListTiles(modalFrame, modalContent, account);
        });

        test(`Amount:${amount} - X button closes modal - ${viewport}`, async () => {
            await closeModalViaXBtn(modalFrame);
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
            await closeAndReopenModal(modalFrame, 'sdk', messageFrame);
        });
    }
);
