import runDescribeBlock from './runDescribeBlock';

// This suite is ignored in v2Renderer mode and should be re-enabled once renderV2Message supports text styling.

const fontSizes = [10, 12, 16];

const tests = [].concat(
    fontSizes.map(size => [`Font size:${size}`, { logo: { type: 'alternative' }, text: { size } }])
);

runDescribeBlock('text', tests);
