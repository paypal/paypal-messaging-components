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

const isV2RendererMode = process.env.BANNER_SNAPSHOT_MODE === 'v2Renderer';
// Re-enable filtered cases once renderV2Message supports flex and full text styling.
const isUnsupportedV2RendererStyle = style =>
    ['alternative', 'inline', 'none'].includes(style?.logo?.type) ||
    Boolean(style?.text?.color) ||
    Boolean(style?.text?.size);
const testsToRun = isV2RendererMode ? tests.filter(([, style]) => !isUnsupportedV2RendererStyle(style)) : tests;

describe(`DE > text (Test Count: ${testsToRun.length * accounts.length})`, () => {
    const runBannerTest = createBannerTest('DE');

    describe.each(accounts)(`> %s (Test Count: ${testsToRun.length})`, account => {
        const getConfig = style => ({
            account,
            style: {
                layout: 'text',
                ...style
            }
        });

        describe.each(testsToRun)('%s', (name, style, viewport = { width: 1000, height: 100 }) => {
            runBannerTest(viewport, getConfig(style));
        });
    });
});
