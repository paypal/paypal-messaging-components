import { Types } from './types';

export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white', 'monochrome', 'grayscale|greyscale']],
            // 14 (not 12) matches v5's actual default rendered font-size (see
            // src/server/message/styles/common.css `html { font-size: 14px }`) — v5 only
            // overrides this when a merchant explicitly sets style.text.size.
            size: [Types.NUMBER, [14, 10, 11, 12, 13, 15, 16]],
            align: [Types.STRING, ['left', 'right', 'center']],
            fontFamily: [Types.ANY],
            fontSource: [Types.ANY]
        }
    },
    flex: {
        color: [
            Types.STRING,
            ['blue', 'black', 'white', 'white-no-border', 'gray|grey', 'monochrome', 'grayscale|greyscale']
        ],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']],
        text: {
            fontFamily: [Types.ANY],
            fontSource: [Types.ANY]
        }
    }
};
