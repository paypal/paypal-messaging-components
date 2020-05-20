import { PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos';
import { dom } from 'jsx-pragmatic';

function gplPPLogo(logoColor) {
    return PayPalLogo({ logoColor }).render(dom({ doc: document }));
}

export default {
    // PRIMARY: {
    //     COLOR: {
    //         src: 'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_de_fc_pri.svg',
    //         dimensions: [1127, 99]
    //     },
    //     WHITE: {
    //         src: gplPPLogo(),
    //         dimensions: [1127, 99]
    //     }
    // },
    ALT_NO_PP: {
        COLOR: {
            src: gplPPLogo(LOGO_COLOR.DEFAULT).getAttribute('src'),
            dimensions: [100, 37]
        }
        // WHITE: {
        //     src: gplPPLogo(LOGO_COLOR.WHITE).getAttribute('src'),
        //     dimensions: [477, 64]
        // }
    }
};
