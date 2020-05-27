export function gbPLContentMediaQuery(breakpoint) {
    return `
    @media (min-width: ${breakpoint}px) {
        .locale--GB .message__content {
            display: inline-flex;
        }
    }
    `;
}
