export function buildLogoConfiguration({ logoPosition, mainItems }) {
    if (logoPosition === 'inline') {
        return { hasInitialLogo: false, hasRightLogo: false, logoBlock: undefined, mainBlocks: mainItems };
    }

    const logoBlock = mainItems.find(item => item.type === 'IMAGE');
    const mainBlocks = mainItems.filter(item => item.type !== 'IMAGE');

    return {
        hasInitialLogo: !!logoBlock && (logoPosition === 'left' || logoPosition === 'top'),
        hasRightLogo: !!logoBlock && logoPosition === 'right',
        logoBlock,
        mainBlocks
    };
}
