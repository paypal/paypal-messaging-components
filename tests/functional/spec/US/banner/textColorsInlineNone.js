import runDescribeBlock from './runDescribeBlock';

const logoTypes = ['inline', 'none'];
const colors = ['black', 'white', 'monochrome', 'grayscale'];

const tests = [].concat(
    colors
        .slice(1)
        .reduce(
            (array, color) =>
                array.concat(
                    logoTypes.map(type => [`${color} text, Logo type:${type}`, { logo: { type }, text: { color } }])
                ),
            []
        )
);

runDescribeBlock('text', tests);
