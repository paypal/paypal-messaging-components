// Permutations used in modal tests
const viewports = [
    { width: 1920, height: 1080 },
    { width: 411, height: 731 }
];

const bannerStyles = [
    {
        layout: 'text',
        logo: {
            position: 'left',
            type: 'primary'
        }
    },
    {
        layout: 'flex',
        ratio: '8x1',
        color: 'blue'
    }
];

const amounts = [1, 10000, undefined, 500];

const getGroupString = ({ viewport, bannerStyle, amount }) => {
    const layoutString = bannerStyle?.layout ? `${bannerStyle.layout},` : '';
    const widthString = viewport?.width ? `wid:${viewport.width},` : '';
    const amountString = amount ? `amt:${amount}` : `amt:undef`;
    return `${layoutString}${widthString}${amountString}:`;
};

module.exports = {
    viewports,
    bannerStyles,
    amounts,
    getGroupString
};
