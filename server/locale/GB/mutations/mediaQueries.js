// Media query used to fallback to "Buy now, pay later."
export function xSmallFallback(breakpoint) {
    return `
    .message__headline {
        white-space: nowrap;
    }

    .message__headline > .tag--medium > span {
        white-space: normal;
    }

    .message__headline > .tag--xsmall {
        display: none;
    }

    @media screen and (max-width: ${breakpoint}px) {

        .message__headline > .tag--medium {
            display: none;
        }

        .message__headline > .tag--xsmall {
            display: inline;
        }

        .message__headline .tag--xsmall > span {
            white-space: nowrap;
        }

        .locale--GB .message__headline > span:nth-child(3) {
            display:none;
        }
    }
`;
}

// Media query used to fallback to "Buy now and pay later with PayPal."
export function smallFallback(breakpoint) {
    return `
    .message__headline {
        white-space: nowrap;
    }

    .message__headline > .tag--medium > span {
        white-space: normal;
    }

    .message__headline > .tag--small {
        display: none;
    }

    @media screen and (max-width: ${breakpoint}px) {
        .message__headline > .tag--medium {
            display: none;
        }

        .message__headline > .tag--small {
            display: inline;
        }
        
        .message__headline .tag--small > span {
            white-space: nowrap;
        }
    }
`;
}

// Moves PayPal logo to position right for logo primary message config.
export function plContentMediaQuery(breakpoint) {
    return `
    @media (min-width: ${breakpoint}px) {
        .locale--GB .message__content {
            display: inline-flex;
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

/**
 * Media query used for GBPL/GBPLQ logo alternative message config.
 * @param {number} disclaimerBreak Changes disclaimer to inline at specified breakpoint.
 * @param {number} tagMediumBreak Breaks text inside of .tag--medium to two lines at specified breakpoint.
 */
export function plAltContentMediaQuery(disclaimerBreak, tagMediumBreak) {
    return `
    @media (max-width: ${disclaimerBreak}px) {
        .message__disclaimer {
            display: block !important;
        }
    }

    @media (max-width: ${tagMediumBreak}px) {
        .message__headline > .tag--medium {
            display: inline;
        }
        .message__headline > .tag--medium .br:first-child {
            display: block;
        }
        .message__disclaimer {
            display: inline;
        }
    }
    `;
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
