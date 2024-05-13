import runDescribeBlock from './runDescribeBlock';

const textAlign = ['left', 'right', 'center'];

const tests = [].concat(
    textAlign.map(align => [`Text align:${align}`, { text: { align } }]),
    // Small viewport
    textAlign.map(align => [
        'Small viewport',
        { logo: { type: 'primary' }, text: { position: 'left', align } },
        { width: 200, height: 100 }
    ])
);

runDescribeBlock('text', tests);
