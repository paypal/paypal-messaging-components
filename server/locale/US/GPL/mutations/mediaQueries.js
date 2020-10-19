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
