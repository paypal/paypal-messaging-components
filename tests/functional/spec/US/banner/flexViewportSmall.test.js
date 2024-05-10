import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const ratios = ['1x1', '1x4', '8x1', '20x1'];
// each viewport has a height of 700 as defined in the describe block below
const viewports = [
    { name: 'Large', width: 1100 },
    { name: 'Small', width: 100 },
    { name: 'Medium', width: 400 }
];

const tests = [].concat(
    viewports.reduce(
        (array, { name, width }) =>
            array.concat(ratios.map(ratio => [`Viewport:${name} Ratio:${ratio}`, { ratio, color: 'blue' }, { width }])),
        []
    )
);

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
