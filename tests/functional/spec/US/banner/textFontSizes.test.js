import runDescribeBlock from './runDescribeBlock';

const fontSizes = [10, 12, 16];

const tests = [].concat(
    fontSizes.map(size => [`Font size:${size}`, { logo: { type: 'alternative' }, text: { size } }])
);

runDescribeBlock('text', tests);
