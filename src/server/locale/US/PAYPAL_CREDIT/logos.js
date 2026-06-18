import { CreditRebrandBadge, CreditRebrandPPBadge, PayPalCreditRebrandLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';
import { html } from '@krakenjs/jsx-pragmatic/src';

function getSrc(component) {
    return component
        .render(html())
        .match(/src="(data:image&#x2F;svg\+xml;base64,[a-zA-Z0-9=+&#x2F;]*)"/)[1]
        .replaceAll('&#x2F;', '/');
}

function getCreditRebrandBadgeSrc(logoColor) {
    return getSrc(CreditRebrandBadge({ logoColor }));
}

function getCreditRebrandPPBadgeSrc(logoColor) {
    return getSrc(CreditRebrandPPBadge({ logoColor }));
}

function getCreditWordmarkSrc(logoColor) {
    return getSrc(PayPalCreditRebrandLogo({ logoColor }));
}

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

const CREDIT_REBRAND_BADGE = {
    COLOR: { src: getCreditRebrandBadgeSrc(LOGO_COLOR.DEFAULT), dimensions: [315, 70] },
    WHITE: { src: getCreditRebrandBadgeSrc(LOGO_COLOR.WHITE), dimensions: [315, 70] },
    BLACK: { src: getCreditRebrandBadgeSrc(LOGO_COLOR.BLACK), dimensions: [315, 70] },
    GRAYSCALE: { src: getCreditRebrandBadgeSrc(LOGO_COLOR.BLACK), dimensions: [315, 70] }
};

const CREDIT_REBRAND_PP_BADGE = {
    COLOR: { src: getCreditRebrandPPBadgeSrc(LOGO_COLOR.DEFAULT), dimensions: [169, 71] },
    WHITE: { src: getCreditRebrandPPBadgeSrc(LOGO_COLOR.WHITE), dimensions: [169, 71] },
    BLACK: { src: getCreditRebrandPPBadgeSrc(LOGO_COLOR.BLACK), dimensions: [169, 71] },
    GRAYSCALE: { src: getCreditRebrandPPBadgeSrc(LOGO_COLOR.BLACK), dimensions: [169, 71] }
};

const CREDIT_WORDMARK = {
    COLOR: { src: getCreditWordmarkSrc(LOGO_COLOR.DEFAULT), dimensions: [171, 31] },
    WHITE: { src: getCreditWordmarkSrc(LOGO_COLOR.WHITE), dimensions: [171, 31] },
    BLACK: { src: getCreditWordmarkSrc(LOGO_COLOR.BLACK), dimensions: [171, 31] },
    GRAYSCALE: { src: getCreditWordmarkSrc(LOGO_COLOR.BLACK), dimensions: [171, 31] }
};

export default {
    STACKED,
    SINGLE_LINE,
    SINGLE_LINE_NO_PP,
    SINGLE_LINE_NO_PAYPAL,
    CREDIT_REBRAND_BADGE,
    CREDIT_REBRAND_PP_BADGE,
    CREDIT_WORDMARK,
    // Alias clarified names to conventional ones for custom banner purposes
    PRIMARY: STACKED,
    ALTERNATIVE: SINGLE_LINE,
    ALT_NO_PAYPAL: SINGLE_LINE_NO_PAYPAL,
    ALT_NO_PP: SINGLE_LINE_NO_PP
};
