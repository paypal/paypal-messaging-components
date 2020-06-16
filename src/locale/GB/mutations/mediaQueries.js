// Media query used to fallback to "Pay Later with Flex."
export function fallbackMediaQuery(breakpoint) {
    return `
    .message__headline {
        white-space: nowrap;
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

// Changes disclaimer to inline at specified breakpoints for the logo alternative message config.
export function gbPLAltContentMediaQuery(minBreakpoint, maxBreakpoint) {
    return `
    @media (min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px) {
        .message__disclaimer {
            display: inline;
        }
    }
    `;
}
