import { Types } from '../../types';

export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white', 'monochrome', 'grayscale|greyscale']],
            size: [Types.NUMBER, [12, 10, 11, 13, 14, 15, 16]],
            align: [Types.STRING, ['left', 'right', 'center']],
            fontFamily: [Types.ANY]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'gray|grey', 'monochrome', 'grayscale|greyscale']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    }
};
