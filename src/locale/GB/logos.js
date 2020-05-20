import { PayPalLogo, PPLogo, LOGO_COLOR } from '@paypal/sdk-logos';
import { dom } from 'jsx-pragmatic';

function gplPPLogo(logoColor) {
    return PayPalLogo({ logoColor }).render(dom({ doc: document }));
}

function gplPPMonogram(logoColor) {
    return PPLogo({ logoColor }).render(dom({ doc: document }));
}

export default {
    PRIMARY: {
        COLOR: [
            {
                src: gplPPMonogram(LOGO_COLOR.DEFAULT).getAttribute('src'),
                dimensions: [24, 32]
            },
            {
                src: gplPPLogo(LOGO_COLOR.DEFAULT).getAttribute('src'),
                dimensions: [100, 32]
            }
        ]
        //     // WHITE: {
        //     //     src: gplPPLogo(),
        //     //     dimensions: [1127, 99]
        //     // }
    },
    ALT_NO_PP: {
        COLOR: {
            src: gplPPLogo(LOGO_COLOR.DEFAULT).getAttribute('src'),
            dimensions: [100, 32]
        }
        // WHITE: {
        //     src: gplPPLogo(LOGO_COLOR.WHITE).getAttribute('src'),
        //     dimensions: [477, 64]
        // }
    }
};
