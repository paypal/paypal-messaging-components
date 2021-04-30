// Media queries shared across numerous locales. All other media queries should be placed in their specific locale folders.

/**
 * Used for primary and alternative GPL US/GB styles in order to fallback to the .tag--xsmall message.
 */
export function xSmallFallback(breakpoint) {
    return `
    .message__headline {
        white-space: normal;
    }

    .message__headline > .tag--medium > span {
        white-space: normal;
    }

    .message__headline > .tag--medium > .weak.br {
        white-space: nowrap;
    }

    .message__headline > .tag--xsmall {
        display: none;
    }

    @media screen and (max-width: ${breakpoint}px) {
        .message__content {
            display: inline-flex;
        }

        .message__headline > .tag--medium {
            display: none;
        }

        .message__headline > .tag--xsmall {
            display: inline;
        }

        .message__headline .tag--xsmall > span {
            white-space: nowrap;
        }
    }
`;
}

/**
 * Used in GPL text messages.
 * Wraps text under logo for default/primary left and alternative config types.
 */
export function textWrap(breakpoint, textSize, locale) {
    return `@media screen and (max-width: ${breakpoint}px) {
        .locale--${locale} .message__content {
            display: block;
            margin-top: -${textSize / 2}px;
        }
        .locale--${locale} .message__logo-container {
            display: inline-flex;
            transform: translateY(${textSize / 2}px);
        }
        .locale--${locale} .message__messaging {
            display: inline;
        }
        .locale--${locale} .message__messaging span.br:first-child {
            white-space: normal;
        }
    }`;
}

/**
 * Prevents alternative-style monogram logo from sitting above the message.
 */
export function altNoWrap(breakpoint) {
    return `
        @media screen and (max-width: ${breakpoint}px) {
            .message__headline {
                white-space: nowrap;
            }
        }
    `;
}

/**
 * Used in logo position:right messages to move the logo above message content at specified breakpoint.
 */
export function setLogoTop(breakpoint) {
    return `
        @media screen and (max-width: ${breakpoint}px) {
            .message__content {
                display: inline-block;
            }
        }
    `;
}

/**
 * Used for message logo width configurations.
 * @param {number} logoContainerWidth Changes message logo container width.
 * @param {number} logoWidth Changes overall logo width.
 * @param {number} monogramWidth Changes width of the first-child of message__logo. In this case, the PP monogram.
 */
export function messageLogoWidth(logoContainerWidth, logoWidth, monogramWidth) {
    const messageLogoContainer =
        typeof logoContainerWidth === 'number' ? `.message__logo-container { width: ${logoContainerWidth}px; }` : '';
    const messageLogo = typeof logoWidth === 'number' ? `.message__logo { width: ${logoWidth}px; }` : '';
    const messageLogoFirstChild =
        typeof monogramWidth === 'number' ? `.message__logo:first-child { width: ${monogramWidth}px; }` : '';
    return [messageLogoContainer, messageLogo, messageLogoFirstChild].join('');
}

// Sets logo position for GPL 20x1 ratio
export function logo20x1() {
    return `
    @media (min-aspect-ratio: 200/11) {
        .message__logo:nth-of-type(1) {
            width: 18%;
            margin-right: 5%;
        }

        .message__logo:nth-of-type(2) {
            display: inline;
        }
    }
    @media (min-aspect-ratio: 200/11) and (min-width: 523px) {
        .message__logo-container {
            max-width: 12%;
        }
    }
    `;
}
