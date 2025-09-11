import { LOGO_COLOR } from '@paypal/sdk-logos/src';
import { createLogo } from '../../utils/svgData';

// Define dimensions for the logos
const PAYPAL_WORDMARK_DIMS = [80, 32];
const PP_MONOGRAM_DIMS = [12, 32];

function getPPLogoBase64(logoColor) {
    switch (logoColor) {
        case LOGO_COLOR.WHITE:
            return createLogo('PP White Wordmark.svg', PAYPAL_WORDMARK_DIMS).src;
        case LOGO_COLOR.BLACK:
        case LOGO_COLOR.MONOCHROME:
            return createLogo('primary.svg', PAYPAL_WORDMARK_DIMS).src;
        default:
            return createLogo('primary.svg', PAYPAL_WORDMARK_DIMS).src;
    }
}

function getPPMonogramBase64(logoColor) {
    switch (logoColor) {
        case LOGO_COLOR.WHITE:
            return createLogo('WhiteMonogram.svg', PP_MONOGRAM_DIMS).src;
        case LOGO_COLOR.BLACK:
        case LOGO_COLOR.MONOCHROME:
            return createLogo('BlackMonogram.svg', PP_MONOGRAM_DIMS).src;
        default:
            return createLogo('PayPal_Monogram_Full Color.svg', PP_MONOGRAM_DIMS).src;
    }
}

export default {
    PP_PAYPAL: {
        COLOR: [
            {
                src: getPPMonogramBase64(LOGO_COLOR.DEFAULT),
                dimensions: [24, 32]
            },
            {
                src: getPPLogoBase64(LOGO_COLOR.DEFAULT),
                dimensions: [100, 32]
            }
        ],
        WHITE: [
            {
                src: getPPMonogramBase64(LOGO_COLOR.WHITE),
                dimensions: [24, 32]
            },
            {
                src: getPPLogoBase64(LOGO_COLOR.WHITE),
                dimensions: [100, 32]
            }
        ],
        GRAYSCALE: [
            {
                src: getPPMonogramBase64(LOGO_COLOR.BLACK),
                dimensions: [24, 32]
            },
            {
                src: getPPLogoBase64(LOGO_COLOR.BLACK),
                dimensions: [100, 32]
            }
        ],
        MONOCHROME: [
            {
                src: getPPMonogramBase64(LOGO_COLOR.MONOCHROME),
                dimensions: [24, 32]
            },
            {
                src: getPPLogoBase64(LOGO_COLOR.MONOCHROME),
                dimensions: [100, 32]
            }
        ]
    },
    NO_PP_MONOGRAM: {
        COLOR: {
            src: getPPLogoBase64(LOGO_COLOR.DEFAULT),
            dimensions: [100, 32]
        },
        WHITE: {
            src: getPPLogoBase64(LOGO_COLOR.WHITE),
            dimensions: [100, 32]
        },
        GRAYSCALE: {
            src: getPPLogoBase64(LOGO_COLOR.BLACK),
            dimensions: [100, 32]
        },
        MONOCHROME: {
            src: getPPLogoBase64(LOGO_COLOR.MONOCHROME),
            dimensions: [100, 32]
        }
    }
};
