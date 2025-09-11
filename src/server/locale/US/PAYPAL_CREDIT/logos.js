import { createLogo } from '../../../../utils/svgData';


const TYPES = ['COLOR', 'WHITE', 'BLACK', 'GRAYSCALE'];
// These are the filename mappings for the SVG files
const TYPE_MAP = { 
    COLOR: { file: 'primary.svg', dims: [100, 100] }, 
    WHITE: { file: 'WhiteMonogram.svg', dims: [100, 100] }, 
    BLACK: { file: 'BlackMonogram.svg', dims: [100, 100] }, 
    GRAYSCALE: { file: 'primary.svg', dims: [100, 100] } 
};

const STACKED = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: createLogo(TYPE_MAP[type].file, TYPE_MAP[type].dims)
    }),
    {}
);

const SINGLE_LINE = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: createLogo(TYPE_MAP[type].file, [100, 80])
    }),
    {}
);

const SINGLE_LINE_NO_PAYPAL = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: createLogo('PPC Wordmark.svg', [100, 100])
    }),
    {}
);

const SINGLE_LINE_NO_PP = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: createLogo('PPC Wordmark.svg', [100, 64])
    }),
    {}
);

export default {
    STACKED,
    SINGLE_LINE,
    SINGLE_LINE_NO_PP,
    SINGLE_LINE_NO_PAYPAL,
    // Alias clarified names to conventional ones for custom banner purposes
    PRIMARY: STACKED,
    ALTERNATIVE: SINGLE_LINE,
    ALT_NO_PAYPAL: SINGLE_LINE_NO_PAYPAL,
    ALT_NO_PP: SINGLE_LINE_NO_PP
};
