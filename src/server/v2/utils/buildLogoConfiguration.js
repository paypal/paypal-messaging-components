export function buildLogoConfiguration({ logoType, logoPosition, mainItems }) {
    const logoBlock = mainItems.find(item => item.type === 'IMAGE');
    const mainBlocks = mainItems.filter(item => item.type !== 'IMAGE');

    if (logoType === 'inline') {
        return { hasInitialLogo: false, hasRightLogo: false, logoBlock, mainBlocks };
    }

    return {
        hasInitialLogo: !!logoBlock && (logoPosition === 'left' || logoPosition === 'top'),
        hasRightLogo: !!logoBlock && logoPosition === 'right',
        logoBlock,
        mainBlocks
    };
}
