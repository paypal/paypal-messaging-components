import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const logoTypes = ['primary', 'alternative', 'inline', 'none'];
const colors = ['black', 'white', 'monochrome', 'grayscale'];

const tests = [].concat(
    colors
        .slice(1)
        .reduce(
            (array, color) =>
                array.concat(
                    logoTypes.map(type => [`${color} text, Logo type:${type}`, { logo: { type }, text: { color } }])
                ),
            []
        )
);

// +1 is for GPL unqualified
describe(`US > text (Test Count: ${tests.length * (accounts.length + 1)})`, () => {
    const runBannerTest = createBannerTest('US');

    describe.each(accounts)(`> %s (Test Count: ${tests.length})`, account => {
        const getConfig = style => ({
            account,
            style: {
                layout: 'text',
                ...style
            }
        });

        describe.each(tests)('%s', (name, style, viewport = { width: 600, height: 100 }) => {
            runBannerTest(viewport, getConfig(style));
        });
    });

    // Run GPL with an unqualified amount
    describe(`> DEV0000000GPL (Test Count: ${tests.length})`, () => {
        const getConfig = style => ({
            account: 'DEV0000000GPL',
            amount: 5,
            style: {
                layout: 'text',
                ...style
            }
        });

        describe.each(tests)('%s', (name, style, viewport = { width: 600, height: 100 }) => {
            runBannerTest(viewport, getConfig(style));
        });
    });
});
