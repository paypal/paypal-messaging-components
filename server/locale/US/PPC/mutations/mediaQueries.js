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

// This allows the logo to switch from SINGLE_LINE logo to SINGLE_LINE_NO_PAYPAL logo
// And allows for word wrapping under the logo
export function primaryContentMediaQuery({ logoContainerBP, logoAltWidth, logoWidth, logoSvgBP, whiteSpaceBP }) {
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
        width: ${logoAltWidth}px;
        margin-right: 0.4rem;
    }
    @media (min-width: ${logoContainerBP}px) {
        .message__logo-container {
            width: ${logoWidth}px;
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
        top: 3px;
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
