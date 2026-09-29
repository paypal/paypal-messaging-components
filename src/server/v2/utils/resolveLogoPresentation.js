// Maps v5 style inputs to v6-equivalent effective logo presentation.
//
// v5 input         effective type    effective position
// primary          wordmark          as provided (left/right/top)
// alternative      monogram          always left (v6 constraint)
// inline           wordmark          always inline (overrides position)
// none             text              in CPS order

const LOGO_TYPE_MAP = {
    primary: 'wordmark',
    alternative: 'monogram',
    inline: 'wordmark',
    none: 'none'
};

const logInvalid = (log, message) => {
    if (typeof log === 'function') {
        log(`Invalid option value (style.logo.position). ${message}`);
    }
};

export function resolveLogoPresentation({ logoType, logoPosition, textColor, log }) {
    const originalLogoType = logoType ?? 'primary';
    const originalLogoPosition = logoPosition ?? 'left';
    const effectiveLogoType = LOGO_TYPE_MAP[originalLogoType] ?? 'wordmark';

    // A non-default explicit position that's about to be overridden is worth a warning;
    // an unset/default "left" position isn't, since nothing is actually being discarded.
    const hasExplicitNonDefaultPosition = !!logoPosition && logoPosition !== 'left';

    let effectiveLogoPosition;
    if (originalLogoType === 'inline') {
        // inline type always overrides position
        effectiveLogoPosition = 'inline';
        if (hasExplicitNonDefaultPosition) {
            logInvalid(log, `The "inline" logo type always overrides position; ignoring "${logoPosition}".`);
        }
    } else if (effectiveLogoType === 'monogram') {
        // monogram (alternative) is always positioned left per v6
        effectiveLogoPosition = 'left';
        if (hasExplicitNonDefaultPosition) {
            logInvalid(log, `The "alternative" logo type is always positioned "left"; ignoring "${logoPosition}".`);
        }
    } else if (effectiveLogoType === 'none') {
        effectiveLogoPosition = 'left';
        if (hasExplicitNonDefaultPosition) {
            logInvalid(log, `The brand renders as text when style.logo.type is "none"; ignoring "${logoPosition}".`);
        }
    } else {
        effectiveLogoPosition = originalLogoPosition;
    }

    return {
        effectiveLogoType,
        effectiveLogoPosition,
        originalLogoType,
        originalLogoPosition,
        // "grayscale" (along with its "greyscale" alias, see validOptions.js) has no v6
        // equivalent — v6 only defines black/white/monochrome. It's kept as a v5-compatibility
        // extension: it maps to the same GRAYSCALE asset key as v5's legacy flex layout.
        textColor: textColor ?? 'black'
    };
}
