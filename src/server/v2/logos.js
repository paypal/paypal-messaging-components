import PPLogo from '../message/logos';
import PPCreditLogo from '../locale/US/PAYPAL_CREDIT/logos';
import VenmoLogo from './venmoLogos';

export const PAYPAL_LOGO_NAME = 'paypal_logo';
export const PAYPAL_CREDIT_LOGO_NAME = 'paypal_credit_logo';
// Confirmed with Jeremy Herman (2026-07-06): CPS returns this item name for Venmo
// content, though it may not be merged into develop yet on the CPS side.
export const VENMO_LOGO_NAME = 'venmo_logo';

// One catalog owns both the stable CPS name and the accessible fallback label.
// The name selects a local asset; the label lets an otherwise valid unnamed
// IMAGE receive its brand-specific presentation without trusting arbitrary text.
const LOGO_BRANDS = [
    { id: 'paypal', name: PAYPAL_LOGO_NAME, alternativeText: 'PayPal' },
    { id: 'paypal-credit', name: PAYPAL_CREDIT_LOGO_NAME, alternativeText: 'PayPal Credit' },
    { id: 'venmo', name: VENMO_LOGO_NAME, alternativeText: 'Venmo' }
];

export function getLogoBrand({ logoName, alternativeText }) {
    return (
        LOGO_BRANDS.find(brand => brand.name === logoName) ??
        LOGO_BRANDS.find(brand => brand.alternativeText === alternativeText)
    );
}

export function getLogoBrandClass({ logoName, alternativeText }) {
    return getLogoBrand({ logoName, alternativeText })?.id ?? '';
}

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

    // wordmark left/right/top: single-line PayPal Credit only. Legacy v5's "left" position
    // swaps between two images at a CSS breakpoint (nth-child + media query, see
    // src/server/locale/US/PAYPAL_CREDIT/mutations/mediaQueries.js) so only one is ever
    // visible; v2 has no breakpoint system, so returning both here rendered them
    // simultaneously and permanently visible. Render the single full-lockup image used
    // at desktop widths instead.
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
    const logoBrand = getLogoBrand({ logoName });

    if (logoBrand?.id === 'paypal') {
        return resolvePayPalLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor });
    }
    if (logoBrand?.id === 'paypal-credit') {
        return resolvePayPalCreditLogoAssets({ effectiveLogoType, effectiveLogoPosition, textColor });
    }
    if (logoBrand?.id === 'venmo') {
        return resolveVenmoLogoAssets({ textColor });
    }
    return null;
}
