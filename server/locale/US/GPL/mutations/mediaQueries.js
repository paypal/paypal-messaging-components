/**
 * Wrap text under logo for default/primary left and alternative config types.
 */
export function textWrap(breakpoint, textSize) {
    return `@media screen and (max-width: ${breakpoint}px) {
        .locale--US .message__content {
            display: block;
            margin-top: -${textSize / 2}px;
        }
        .locale--US .message__logo-container {
            display: inline-flex;
            transform: translateY(${textSize / 2}px);
        }
        .locale--US .message__messaging {
            display: inline;
        }
        .locale--US .message__messaging span.br:first-child {
            white-space: normal;
        }
    }`;
}

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

// Sets logo position for GPL 6x1 ratio
export function logo6x1() {
    return `
    @media (max-aspect-ratio: 61/10) and (min-width: 324px) {
        .message__logo-container {
            margin-right: 5%;
            margin-top: 2px;
        }
        .message__logo:nth-of-type(1) {
            margin: 0 5px;
            width: 30%;
        }
        .message__logo:nth-of-type(2) {
            display: inline;
            width: 105px;
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
