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
 * Stop wrapping past a certain point on xsmall tag.
 */
export function xSmallNoWrap(breakpoint) {
    return `@media screen and (max-width: ${breakpoint}px) {.locale--DE .message__headline .tag--xsmall > span:first-child {white-space: nowrap;}}`;
}

/**
 * Media query used in GPL GTZ and GPLQ GTZ for wrapping of a logo primary left position message.
 */
export function primaryWrap(breakpoint) {
    return `@media screen and (max-width: ${breakpoint}px) { 
        .locale--DE .message__headline .tag--xsmall > span:first-child {
            white-space: normal;
        }
        .locale--DE .message__messaging span.br:first-child { white-space: nowrap; }
    }`;
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
