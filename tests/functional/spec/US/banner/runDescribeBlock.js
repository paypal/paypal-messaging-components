import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

// layout is flex or text
export default function runDescribeBlock(layout, tests) {
    // +1 is for GPL unqualified
    describe(`US > ${layout} (Test Count: ${tests.length * (accounts.length + 1)})`, () => {
        const runBannerTest = createBannerTest('US');
        const isFlexLayout = layout === 'flex';
        const viewportDefault = isFlexLayout ? { width: 1100 } : { width: 600, height: 100 };

        describe.each(accounts)(`> %s (Test Count: ${tests.length})`, account => {
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
