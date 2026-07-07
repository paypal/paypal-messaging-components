import runDescribeBlock from './runDescribeBlock';

// This suite is ignored in v2Renderer mode and should be re-enabled once renderV2Message supports text styling.

const positions = ['top', 'left', 'right'];
const logoTypes = ['alternative', 'inline', 'none'];

const tests = [].concat(
    // Logo types with valid logo position options
    logoTypes
        .slice(0, 2)
        .reduce(
            (array, type) =>
                array.concat(
                    positions.map(position => [`${type}, Position:${position}`, { logo: { type, position } }])
                ),
            []
        ),
    // Logo types that do not have different logo position options
    logoTypes.slice(2).map(type => [`Logo type:${type}`, { logo: { type } }])
);

runDescribeBlock('text', tests);
