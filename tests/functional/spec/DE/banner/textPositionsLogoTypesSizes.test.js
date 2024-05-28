import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const positions = ['top', 'left', 'right'];
const logoTypes = ['primary', 'alternative', 'inline', 'none'];
const fontSizes = [10, 12, 16];

const tests = [].concat(
    // Logo type primary and all valid logo position options
    positions.map(position => [`Primary, Position:${position}`, { logo: { type: 'primary', position } }]),
    // Logo types that do not have different logo position options
    logoTypes.slice(1).map(type => [`Logo type:${type}`, { logo: { type } }]),
    // Each font size option logo.type-primary
    fontSizes.map(size => [`Font size:${size}`, { logo: { type: 'primary' }, text: { size } }])
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
