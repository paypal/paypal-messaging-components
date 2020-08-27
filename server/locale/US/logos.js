const ROOT_URL = 'https://www.paypalobjects.com/upstream/assets/logos/US';
const TYPES = ['COLOR', 'WHITE', 'BLACK', 'GRAYSCALE'];
const TYPE_MAP = { COLOR: 'fc', WHITE: 'wh', BLACK: 'mono', GRAYSCALE: 'grayscale' };
const getSvgSrc = svgFileName => `${ROOT_URL}/${svgFileName}.svg`;

const STACKED = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: { dimensions: [453, 152], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_pri`) }
    }),
    {}
);

const SINGLE_LINE = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: { dimensions: [573, 80], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt`) }
    }),
    {}
);

const SINGLE_LINE_NO_PAYPAL = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: { dimensions: [401, 100], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt_no_paypal`) }
    }),
    {}
);

const SINGLE_LINE_NO_PP = TYPES.reduce(
    (object, type) => ({
        ...object,
        [type]: { dimensions: [477, 64], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt_noPP`) }
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
