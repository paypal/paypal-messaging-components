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

export function altContentMediaQuery(breakpoint) {
    return `
    @media (min-width: ${breakpoint}px) {
        .message__content {
            display: inline-flex;
        }
    }
    `;
}
