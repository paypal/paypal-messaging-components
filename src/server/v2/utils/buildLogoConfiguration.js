export function buildLogoConfiguration({ effectiveLogoType, effectiveLogoPosition, mainItems }) {
    // none: no logo rendered; IMAGE blocks are stripped so they don't leak into content
    if (effectiveLogoType === 'none') {
        return {
            hasInitialLogo: false,
            hasRightLogo: false,
            logoBlock: undefined,
            mainBlocks: mainItems.filter(item => item.type !== 'IMAGE')
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
