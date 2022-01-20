import { Types } from '../../types';

export default {
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'gray|grey', 'monochrome', 'grayscale|greyscale']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']],
        text: {
            fontFamily: [Types.STRING],
            fontSource: [Types.ANY]
        }
    }
};
