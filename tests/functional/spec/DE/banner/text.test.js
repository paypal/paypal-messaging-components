import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const logoTypes = ['primary', 'alternative', 'inline', 'none'];
const fontSizes = [10, 12, 16];

const tests = [].concat(
    // Each valid logo type
    logoTypes.map(type => [`Logo type:${type}`, { logo: { type } }]),
    // Each font size option logo.type-primary
    fontSizes.map(size => [`Font size:${size}`, { logo: { type: 'primary' }, text: { size } }]),
    // Each logo type, logo.position-left_text.color-white
    logoTypes.map(type => [`White text, Logo type:${type}`, { logo: { type }, text: { color: 'white' } }]),
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
