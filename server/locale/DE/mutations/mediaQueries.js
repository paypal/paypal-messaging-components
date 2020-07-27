export function altLogoMediaQuery(breakpoint, textSize) {
    return `@media (min-width: ${breakpoint}px) {
      .locale--DE .message__content {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .locale--DE .message__content .message__messaging {
        font-size: ${textSize}px;
      }
    }`;
}
