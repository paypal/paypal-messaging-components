// Media queries and commonly used style functions for DE GPL.

/**
 * Add period after formatted min amount and formatted max amount.
 */
export function addPeriod() {
    return `.message__headline > .tag--medium > span > span:nth-child(2)::after {
        content: '.'
    }`;
}

/**
 * Allow for additional wrapping of the xsmall tag.
 */
export function xSmallWrap(breakpoint) {
    return `@media screen and (max-width: ${breakpoint}px) {.message__headline .tag--xsmall > span {white-space: normal;
        }
    }
    `;
}

/**
 * Adds the word "Ratenzahlung" after logo type none 9.99% DE GPL fallback messages
 */
export function logoNoneAddRatenzahlungAfterPayPal(breakpoint, elementChild = 3) {
    return `@media screen and (max-width: ${breakpoint}px) {
        .message__headline > span:nth-child(${elementChild}) > strong {
            display:none;
        }
        .message__headline > span:nth-child(${elementChild}) > .pp-text-logo::before {
            content: ' PayPal';
            font-weight: bold;
        }
        .message__headline > span:nth-child(${elementChild})::after {
            content: ' Ratenzahlung.';
            font-weight: normal;
        }
    }`;
}

/**
 * Adds the word "Ratenzahlung" after logo type inline 9.99% DE GPL fallback messages
 */
export function logoInlineAddRatenzahlungAfterPayPal(breakpoint) {
    return `
    @media screen and (max-width: ${breakpoint}px) {
        .message__logo-container::after {
            content: ' Ratenzahlung.';
        }
    }`;
}

/**
 * Used in the DE GPL non-qualifying GTZ (9.99%) message. Falls back to middle (medium.2) fallback
 * before falling back to xsmall tag fallback.
 */
export function middleAndSmallestFallback(mediumBreakpoint, xSmallBreakpoint) {
    return `
    .message__headline {
        white-space: normal;
    }

    .message__headline > .tag--medium > span {
        white-space: normal;
    }

    .message__headline > .tag--medium:nth-child(2) {
        display: none;
    }

    .message__headline > .tag--xsmall {
        display: none;
    }

    @media screen and (max-width: ${mediumBreakpoint}px) {
        .message__content {
            display: inline-flex;
        }

        .message__headline > .tag--medium:first-child {
            display: none;
        }

        .message__headline > .tag--medium:nth-child(2) {
            display: inline;
        }
    }

    @media screen and (max-width: ${xSmallBreakpoint}px) {
        .message__content {
            display: inline-flex;
        }

        .message__headline > .tag--medium:nth-child(2) {
            display: none;
        }

        .message__headline > .tag--xsmall {
            display: inline;
        }
    }
`;
}
