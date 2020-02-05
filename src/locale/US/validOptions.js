import { Types } from '../../messages/models/Banner/types';

export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white']],
            size: [Types.NUMBER, [12, 10, 11, 13, 14, 15, 16]],
            fontFamily: [Types.STRING]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey', 'salmon']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    },
    legacy: {
        typeNI: [Types.STRING, ['', 'image', 'html']],
        typeEZP: [Types.STRING, ['', 'html']],
        size: [Types.STRING],
        color: [Types.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
        border: [Types.BOOLEAN, [true, false]]
    },
    custom: {
        markup: [Types.STRING],
        ratio: [Types.ANY]
    }
};
