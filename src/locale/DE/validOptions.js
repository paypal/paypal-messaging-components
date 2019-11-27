import { Types } from '../../messages/models/Banner/types';

export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']]
        },
        text: {
            color: [Types.STRING, ['black', 'white']]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'gray|grey']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    }
};
