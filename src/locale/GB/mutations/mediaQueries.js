// Media query used to fallback to "Pay Later with Flex."
export function fallbackMediaQuery(breakpoint) {
    return `
    .message__headline {
        white-space: nowrap;
    }

    .message__headline > .tag--medium > span {
        white-space: normal;
    }

    .message__headline > span:nth-child(2) {
        display: none;
    }

    @media (max-width: ${breakpoint}px) {

        .message__headline > span:first-child {
            display: none;
        }

        .message__headline > span:nth-child(2) {
            display: inline;
        }
        
        .message__headline span.multi:nth-child(2) > span {
            white-space: nowrap;
        }

        .locale--GB .message__headline > span:last-child {
            display:none;
        }
    } 
`;
}

// Moves PayPal logo to position right for logo primary message config.
export function gbPLContentMediaQuery(breakpoint) {
    return `
    @media (min-width: ${breakpoint}px) {
        .locale--GB .message__content {
            display: inline-flex;
        }
    }
    `;
}

/**
 * Media query used for GBPL/GBPLQ logo alternative message config.
 * @param {number} disclaimerBreak Changes disclaimer to inline at specified breakpoint.
 * @param {number} productNameBreak Changes product name (i.e. "with Flex") to display block at specified breakpoint.
 * @param {number} tagMediumBreak Breaks text inside of .tag--medium to two lines at specified breakpoint.
 */
export function gbPLAltContentMediaQuery(disclaimerBreak, productNameBreak, tagMediumBreak) {
    return `
    @media (max-width: ${disclaimerBreak}px) {
        .message__disclaimer {
            display: block !important;
        }
    }
    @media (max-width: ${productNameBreak}px) {
        .message__headline > .tag--medium {
            display: block;
        }
        .message__disclaimer {
            display: inline;
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
