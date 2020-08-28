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
 * Used for inline and none styles in order to fallback to the tag--small message.
 */
export function smallTagMediaQuery(breakpoint) {
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

/**
 * Used for primary and alternative styles in order to fallback to the tag--xsmall message.
 */
export function xsmallTagMediaQuery(breakpoint) {
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

        .locale--US .message__headline > span:nth-child(3) {
            // display:none;
        }
    } 
`;
}
