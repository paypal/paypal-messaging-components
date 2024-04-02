import { Types } from '../../../../types';

export default {
    text: {
        text: {
            color: [Types.STRING, ['black', 'white', 'monochrome', 'grayscale|greyscale']],
            size: [Types.NUMBER, [12, 10, 11, 13, 14, 15, 16]],
            align: [Types.STRING, ['left', 'right', 'center']],
            fontFamily: [Types.STRING],
            fontSource: [Types.ANY]
        }
    }
};
