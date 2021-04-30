import { PayPalLogo, PPLogo, PPMonochrome, LOGO_COLOR } from '@paypal/sdk-logos/';
import { html } from 'jsx-pragmatic';

function getSrc(component) {
    return component
        .render(html())
        .match(/src="(data:image&#x2F;svg\+xml;base64,[a-zA-Z0-9=+]*)"/)[1]
        .replace('&#x2F;', '/');
}

function getPPLogoBase64(logoColor) {
    return getSrc(PayPalLogo({ logoColor }));
}

function getPPMonogramBase64(logoColor) {
    if (logoColor === 'monochrome') {
        return getSrc(PPMonochrome({ logoColor }));
    }
    return getSrc(PPLogo({ logoColor }));
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
