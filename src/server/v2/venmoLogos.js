import { VenmoLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';
import { html } from '@krakenjs/jsx-pragmatic/src';

function getSrc(component) {
    return component
        .render(html())
        .match(/src="(data:image&#x2F;svg\+xml;base64,[a-zA-Z0-9=+]*)"/)[1]
        .replace('&#x2F;', '/');
}

function getVenmoLogoBase64(logoColor) {
    return getSrc(VenmoLogo({ logoColor }));
}

// Venmo has no separate monogram asset (unlike PayPal's PP icon) and no distinct
// monochrome color variant in @paypal/sdk-logos; grayscale/monochrome both fall
// back to the BLACK color variant, same as PayPal Credit's asset family.
export default {
    VENMO: {
        COLOR: { src: getVenmoLogoBase64(LOGO_COLOR.BLUE), dimensions: [101, 32] },
        WHITE: { src: getVenmoLogoBase64(LOGO_COLOR.WHITE), dimensions: [101, 32] },
        GRAYSCALE: { src: getVenmoLogoBase64(LOGO_COLOR.BLACK), dimensions: [101, 32] },
        MONOCHROME: { src: getVenmoLogoBase64(LOGO_COLOR.BLACK), dimensions: [101, 32] }
    }
};
