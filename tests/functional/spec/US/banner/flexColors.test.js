import runDescribeBlock from './runDescribeBlock';

// This suite is ignored in v2Renderer mode and should be re-enabled once renderV2Message supports flex styling.

const colors = ['blue', 'black', 'white', 'gray', 'white-no-border', 'monochrome', 'grayscale'];

const tests = [].concat(colors.slice(1).map(color => [`Ratio:1x1. Color:${color}`, { ratio: '1x1', color }]));

runDescribeBlock('flex', tests);
