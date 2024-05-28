import runDescribeBlock from './runDescribeBlock';

const ratios = ['1x1', '1x4', '8x1', '20x1'];
const viewports = [{ name: 'Large', width: 1100 }];

const tests = [].concat(
    viewports.reduce(
        (array, { name, width }) =>
            array.concat(ratios.map(ratio => [`Viewport:${name} Ratio:${ratio}`, { ratio, color: 'blue' }, { width }])),
        []
    )
);

runDescribeBlock('flex', tests);
