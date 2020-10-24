import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const positions = ['top', 'left', 'right'];
const logoTypes = ['primary', 'alternative', 'inline', 'none'];
const fontSizes = [10, 12, 16];
const colors = ['black', 'white', 'monochrome', 'grayscale'];

const tests = [].concat(
    // Logo types with valid logo position options
    logoTypes
        .slice(0, 2)
        .reduce(
            (array, type) =>
                array.concat(
                    positions.map(position => [`${type}, Position:${position}`, { logo: { type, position } }])
                ),
            []
        ),
    // Logo types that do not have different logo position options
    logoTypes.slice(2).map(type => [`Logo type:${type}`, { logo: { type } }]),
    // Each font size option logo.type-alternative
    fontSizes.map(size => [`Font size:${size}`, { logo: { type: 'alternative' }, text: { size } }]),
    // Each logo type, with non-black color options
    colors
        .slice(1)
        .reduce(
            (array, color) =>
                array.concat(
                    logoTypes.map(type => [`${color} text, Logo type:${type}`, { logo: { type }, text: { color } }])
                ),
            []
        ),
    // Small viewport
    [['Small viewport', { logo: { type: 'primary' }, text: { position: 'left' } }, { width: 200, height: 100 }]]
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
