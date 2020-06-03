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
    }
};
