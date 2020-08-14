const ROOT_URL = 'https://www.paypalobjects.com/upstream/assets/logos/US';
const TYPES = ['COLOR', 'WHITE', 'BLACK', 'GRAYSCALE'];
const TYPE_MAP = { COLOR: 'fc', WHITE: 'wh', BLACK: 'mono', GRAYSCALE: 'grayscale' };
const getSvgSrc = svgFileName => `${ROOT_URL}/${svgFileName}.svg`;

export default {
    PRIMARY: TYPES.reduce(
        (object, type) => ({
            ...object,
            [type]: { dimensions: [573, 80], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt`) }
        }),
        {}
    ),
    ALTERNATIVE: TYPES.reduce(
        (object, type) => ({
            ...object,
            [type]: { dimensions: [573, 80], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt`) }
        }),
        {}
    ),
    ALT_NO_PAYPAL: TYPES.reduce(
        (object, type) => ({
            ...object,
            [type]: { dimensions: [401, 100], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt_no_paypal`) }
        }),
        {}
    ),
    ALT_NO_PP: TYPES.reduce(
        (object, type) => ({
            ...object,
            [type]: { dimensions: [477, 64], src: getSvgSrc(`ppc_${TYPE_MAP[type]}_alt_noPP`) }
        }),
        {}
    )
};
