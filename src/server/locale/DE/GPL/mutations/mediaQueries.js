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

// The media queries below are related to DE GPL cross-border (XB) text messages.

/**
 * This function combines 3 commonly used media queries across all XB DE messages for logos primary and alternative.
 * crossBorderDisclaimerWrap controls the points in which the "Mehr erfahren" drops to a new line independently from "Nur mit dt. PayPal Konto."
 * and when it shoudl rejoin it on the same line.
 */
export function crossBorderDisclaimerWrap(breakpointOne, breakpointTwo, breakpointThree, breakpointFour) {
    return `
    @media screen and (min-width: ${breakpointOne}px) and (max-width: ${breakpointTwo}px) { 
        .message__messaging > .message__disclaimer > .tag--default::before { 
            content: ''; display: block; 
        }
    }
    @media screen and (max-width: ${breakpointThree}px) { 
        .message__messaging > .message__disclaimer > .tag--default::before { 
            content: ''; display: block; 
        }
    }
    @media screen and (max-width: ${breakpointFour}px) { 
        .locale--DE .message__messaging { 
            display: inline-block; 
        } 
    }`;
}

// Controls logo type none wrapping for the XB DE message headlines.
export function crossBorderLogoNoneWrap(breakpoint) {
    return `
    @media screen and (max-width: ${breakpoint}px) {
        .message__headline > span:last-child {
            white-space: nowrap; 
        }
    }`;
}
