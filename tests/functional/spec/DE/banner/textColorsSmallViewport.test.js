import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const logoTypes = ['primary', 'alternative', 'inline', 'none'];
const colors = ['black', 'white', 'monochrome', 'grayscale'];

const tests = [].concat(
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

describe(`DE > text (Test Count: ${tests.length * accounts.length})`, () => {
    const runBannerTest = createBannerTest('DE');

    describe.each(accounts)(`> %s (Test Count: ${tests.length})`, account => {
        const getConfig = style => ({
            account,
            style: {
                layout: 'text',
                ...style
            }
        });

        describe.each(tests)('%s', (name, style, viewport = { width: 1000, height: 100 }) => {
            runBannerTest(viewport, getConfig(style));
        });
    });
});
