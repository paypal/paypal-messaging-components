import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

// layout is flex or text
export default function runDescribeBlock(layout, tests) {
    const isV2RendererMode = process.env.BANNER_SNAPSHOT_MODE === 'v2Renderer';
    const isButtonOrMarkAccount = account => account.includes('BTN') || account.includes('MRK');
    const excludedV2Accounts = ['DEV000GENBNPL', 'DEV0GENERICPL', 'DEV0000GENPYPL', 'DEV000GENPYPL'];
    const isExcludedV2Account = account => excludedV2Accounts.includes(account);
    // Re-enable BTN/MRK and explicitly excluded v2 accounts once renderV2Message supports flex and full text styling.
    const shouldExcludeAccount = account =>
        (isButtonOrMarkAccount(account) && (isV2RendererMode || layout === 'flex')) ||
        (isV2RendererMode && isExcludedV2Account(account));
    const accountsToRun = accounts.filter(account => !shouldExcludeAccount(account));

    // +1 is for GPL unqualified
    describe(`US > ${layout} (Test Count: ${tests.length * (accountsToRun.length + 1)})`, () => {
        const runBannerTest = createBannerTest('US');
        const isFlexLayout = layout === 'flex';
        const viewportDefault = isFlexLayout ? { width: 1100 } : { width: 600, height: 100 };

        describe.each(accountsToRun)(`> %s (Test Count: ${tests.length})`, account => {
            const getConfig = style => ({
                account,
                style: {
                    layout,
                    ...style
                }
            });

            describe.each(tests)('%s', (name, style, viewport = viewportDefault) => {
                if (isFlexLayout) {
                    viewport.height = 700; // eslint-disable-line no-param-reassign
                }
                runBannerTest(viewport, getConfig(style));
            });
        });

        // Run GPL with an unqualified amount
        describe(`> DEV0000000GPL (Test Count: ${tests.length})`, () => {
            const getConfig = style => ({
                account: 'DEV0000000GPL',
                amount: 5,
                style: {
                    layout,
                    ...style
                }
            });

            describe.each(tests)('%s', (name, style, viewport = viewportDefault) => {
                if (isFlexLayout) {
                    viewport.height = 700; // eslint-disable-line no-param-reassign
                }
                runBannerTest(viewport, getConfig(style));
            });
        });
    });
}
