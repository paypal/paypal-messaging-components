import { PayPalLogo, PPLogo, LOGO_COLOR } from '@paypal/sdk-logos';
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
    return getSrc(PPLogo({ logoColor }));
}

export default {
    PRIMARY: {
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
        ]
    },
    ALT_NO_PP: {
        COLOR: {
            src: getPPLogoBase64(LOGO_COLOR.DEFAULT),
            dimensions: [100, 32]
        },
        WHITE: {
            src: getPPLogoBase64(LOGO_COLOR.WHITE),
            dimensions: [100, 32]
        }
    }
};
