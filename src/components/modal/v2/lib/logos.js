import { PayPalLogo, PPLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';
import { dom } from '@krakenjs/jsx-pragmatic/src';

function getPPLogoBase64(logoColor) {
    return PayPalLogo({ logoColor })
        .render(dom({ doc: document }))
        .getAttribute('src');
}

function getPPMonogramBase64(logoColor) {
    return PPLogo({ logoColor })
        .render(dom({ doc: document }))
        .getAttribute('src');
}

export const logos = {
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
