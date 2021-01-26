import createBannerTest from '../../createBannerTest';
import accounts from '../accounts';

const ratios = ['1x1', '1x4', '8x1', '20x1'];
const colors = ['blue', 'black', 'white', 'gray'];
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
    ),
    colors.slice(1).map(color => [`Ratio:1x1. Color:${color}`, { ratio: '1x1', color }])
);

describe(`FR > flex (Test Count: ${tests.length * accounts.length})`, () => {
    const runBannerTest = createBannerTest('FR');

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
});
