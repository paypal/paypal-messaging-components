import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const colors = ['blue', 'black', 'white', 'gray', 'white-no-border', 'monochrome', 'grayscale'];
// each viewport has a height of 700 as defined in the describe block below

const tests = [].concat(colors.slice(1).map(color => [`Ratio:1x1. Color:${color}`, { ratio: '1x1', color }]));

// +1 is for GPL unqualified
describe(`US > flex (Test Count: ${tests.length * (accounts.length + 1)})`, () => {
    const runBannerTest = createBannerTest('US');

    describe.each(accounts)(`> %s (Test Count: ${tests.length})`, account => {
        const getConfig = style => ({
            account,
            style: {
                layout: 'flex',
                ...style
            }
        });

        describe.each(tests)('%s', (name, style, viewport = { width: 1100 }) => {
            viewport.height = 700; // eslint-disable-line no-param-reassign
            runBannerTest(viewport, getConfig(style));
        });
    });

    // Run GPL with an unqualified amount
    describe(`> DEV0000000GPL (Test Count: ${tests.length})`, () => {
        const getConfig = style => ({
            account: 'DEV0000000GPL',
            amount: 5,
            style: {
                layout: 'flex',
                ...style
            }
        });

        describe.each(tests)('%s', (name, style, viewport = { width: 1100 }) => {
            viewport.height = 700; // eslint-disable-line no-param-reassign
            runBannerTest(viewport, getConfig(style));
        });
    });
});
