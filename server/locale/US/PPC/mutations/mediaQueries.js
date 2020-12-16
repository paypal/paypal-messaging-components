export function basicMediaQuery(breakpoint) {
    return `
    .message__headline span.multi:nth-child(2) {
        display: none;
    }

    @media (min-width: ${breakpoint}px) {
        .message__headline span.multi:first-child {
            display: none;
        }

        .message__headline span.multi:nth-child(2) {
            display: inline;
        }
    }
`;
}

/**
 * This allows the logo to switch from the SINGLE_LINE_NO_PAYPAL logo on mobile to SINGLE_LINE logo on larger sizes
 * Also allows for word wrapping under the logo.
 * @param {number} logoContainerBP - breakpoint that the logo changes to SINGLE_LINE at
 * @param {number} width.smallLogo - width for the logo used on mobile
 * @param {number} width.largeLogo - width for the logo used on larger sizes
 * @param {number} logoSvgBP - breakpoint to adjust logo position on larger sizes
 * @param {number} whiteSpaceBP - brekpoint to adjust for not wrapping on larger sizes
 */
export function primaryContentMediaQuery({ logoContainerBP, width, logoSvgBP, whiteSpaceBP }) {
    const logoSvgCss = logoSvgBP
        ? `
        @media (min-width: ${logoSvgBP}px) {
            .message__logo--svg {
                top: 0;
            }
        }
        `
        : '';

    return `
    .message__content {
        display: inline-block;
    }

    .message__logo-container {
        display: inline-block;
        width: ${width.smallLogo}px;
        margin-right: 0.4rem;
    }
    @media (min-width: ${logoContainerBP}px) {
        .message__logo-container {
            width: ${width.largeLogo}px;
        }
    }

    .message__logo--svg:nth-child(2) {
        display: none;
    }
    @media (min-width: ${logoContainerBP}px) {
        .message__logo--svg:nth-child(1) {
            display: none;
        }
        .message__logo--svg:nth-child(2) {
            display: block;
        }
    }
    .message__logo--svg {
        top: 2px;
    }
    ${logoSvgCss}

    .message__messaging {
        display: inline;
    }
    .message__messaging span.br {
        white-space: normal;
    }
    @media (min-width: ${whiteSpaceBP}px) {
        .message__messaging span.br {
            white-space: nowrap;
        }
    }
    `;
}

export function altContentMediaQuery(breakpoint) {
    return `
    @media (min-width: ${breakpoint}px) {
        .message__content {
            display: inline-flex;
        }
    }
    `;
}

/**
 * Will break 'Learn more' to a new line at the given breakpoint when used.
 */
export function messageDisclaimerMediaQuery(breakpoint) {
    return `
    @media (max-width: ${breakpoint}px) {
        .message__disclaimer {
            display: block;
        }
    }
    `;
}

/**
 * Only shows "at 0% APR" at larger sizes
 */
export function zeroAprMediaQuery(breakpoint) {
    return `
        .weakest {
            display: none;
        }
        @media (min-width: ${breakpoint}px) {
            .weakest {
                display: inline;
            }
        }
    `;
}

export function textWrap(breakpoint, textSize, locale) {
    return `@media screen and (max-width: ${breakpoint}px) {
        .locale--${locale} .message__content {
            display: block;
            margin-top: -${(textSize / 2) * 0}px;
        }
        .locale--${locale} .message__logo-container {
            display: inline-flex;
            transform: translateY(${(textSize / 2) * 0}px);
        }
        .locale--${locale} .message__messaging {
            display: inline;
        }
        .locale--${locale} .message__messaging span.br:first-child {
            white-space: normal;
        }
    }`;
}
