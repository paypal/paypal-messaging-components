import PPLogo from '../message/logos';
import PPCreditLogo from '../locale/US/PAYPAL_CREDIT/logos';
import VenmoLogo from './venmoLogos';

export const PAYPAL_LOGO_NAME = 'paypal_logo';
export const PAYPAL_CREDIT_LOGO_NAME = 'paypal_credit_logo';
// Confirmed with Jeremy Herman (2026-07-06): CPS returns this item name for Venmo
// content, though it may not be merged into develop yet on the CPS side.
export const VENMO_LOGO_NAME = 'venmo_logo';

const PP_COLOR_KEY = {
    black: 'COLOR',
    white: 'WHITE',
    grayscale: 'GRAYSCALE',
    monochrome: 'MONOCHROME'
};

// PayPal Credit uses BLACK (not MONOCHROME) in its asset family
const PPC_COLOR_KEY = {
    black: 'COLOR',
    white: 'WHITE',
    grayscale: 'GRAYSCALE',
    monochrome: 'BLACK'
};

function resolvePayPalLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor }) {
    const colorKey = PP_COLOR_KEY[textColor] ?? 'COLOR';

    if (effectiveLogoType === 'monogram') {
        return [PPLogo.PP_PAYPAL[colorKey][0]];
    }

    // wordmark inline: PayPal text only, no PP monogram
    if (effectiveLogoPosition === 'inline') {
        return [PPLogo.NO_PP_MONOGRAM[colorKey]];
    }

    // wordmark standalone (left/right/top): PP monogram + PayPal wordmark
    return PPLogo.PP_PAYPAL[colorKey];
}

function resolvePayPalCreditLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor }) {
    const colorKey = PPC_COLOR_KEY[textColor] ?? 'COLOR';

    if (effectiveLogoPosition === 'inline') {
        return [PPCreditLogo.SINGLE_LINE_NO_PP[colorKey]];
    }

    if (effectiveLogoType === 'monogram') {
        return [PPCreditLogo.SINGLE_LINE_NO_PAYPAL[colorKey]];
    }

    // wordmark left: two-image layout (no-PayPal wordmark + full PayPal Credit)
    if (effectiveLogoPosition === 'left') {
        return [PPCreditLogo.SINGLE_LINE_NO_PAYPAL[colorKey], PPCreditLogo.SINGLE_LINE[colorKey]];
    }

    // wordmark right/top: single-line PayPal Credit only
    return [PPCreditLogo.SINGLE_LINE[colorKey]];
}

// Venmo has a single combined wordmark asset (no monogram, no distinct inline variant),
// so effectiveLogoType/effectiveLogoPosition don't affect which asset is chosen.
function resolveVenmoLogoAssets({ textColor }) {
    const colorKey = PP_COLOR_KEY[textColor] ?? 'COLOR';
    return [VenmoLogo.VENMO[colorKey]];
}

// Returns Array<{src, dimensions: [w, h]}> for known first-party logos,
// or null to signal the caller should fall back to item.source_url.
export function resolveLogoAssets({ logoName, effectiveLogoType, effectiveLogoPosition, textColor }) {
    if (logoName === PAYPAL_LOGO_NAME) {
        return resolvePayPalLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor });
    }
    if (logoName === PAYPAL_CREDIT_LOGO_NAME) {
        return resolvePayPalCreditLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor });
    }
    if (logoName === VENMO_LOGO_NAME) {
        return resolveVenmoLogoAssets({ textColor });
    }
    return null;
}
