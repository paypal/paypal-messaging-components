export function buildLogoConfiguration({ effectiveLogoType, effectiveLogoPosition, mainItems }) {
    // v5's "none" presentation replaces the graphic with the product/brand name in text.
    // CPS supplies that accessible brand name on the IMAGE block's alternative_text field.
    if (effectiveLogoType === 'none') {
        return {
            hasInitialLogo: false,
            hasRightLogo: false,
            logoBlock: undefined,
            mainBlocks: mainItems
                .map((item, index) => {
                    if (item.type !== 'IMAGE') return item;

                    const previousItem = mainItems[index - 1];
                    const nextItem = mainItems[index + 1];
                    const brandText = item.alternative_text ?? '';
                    const leadingSpace = previousItem?.type === 'TEXT' && !/\s$/.test(previousItem.text) ? ' ' : '';
                    const trailingSpace = nextItem?.type === 'TEXT' && !/^[\s.,;:!?)]/.test(nextItem.text) ? ' ' : '';

                    return brandText
                        ? { type: 'TEXT', text: `${leadingSpace}${brandText}${trailingSpace}`, brand: true }
                        : null;
                })
                .filter(Boolean)
        };
    }

    // inline: preserve CPS main_items order; IMAGE blocks render in-place via renderBlock
    if (effectiveLogoPosition === 'inline') {
        return {
            hasInitialLogo: false,
            hasRightLogo: false,
            logoBlock: undefined,
            mainBlocks: mainItems
        };
    }

    const logoBlock = mainItems.find(item => item.type === 'IMAGE');
    const mainBlocks = mainItems.filter(item => item.type !== 'IMAGE');

    return {
        hasInitialLogo: !!logoBlock && (effectiveLogoPosition === 'left' || effectiveLogoPosition === 'top'),
        hasRightLogo: !!logoBlock && effectiveLogoPosition === 'right',
        logoBlock,
        mainBlocks
    };
}
