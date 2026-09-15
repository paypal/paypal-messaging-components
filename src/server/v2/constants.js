export const VARIANT = 'B';
export const PORT = process.env.PORT || 8080;

export const FLEX_DEFAULTS = {
    color: 'blue',
    ratio: '1x1'
};

// Maps flex style.color to logo asset variant keys (see flexLogoMutations + v5 flex defaults).
export const FLEX_COLOR_TO_LOGO_TEXT_COLOR = {
    blue: 'white',
    black: 'white',
    white: 'black',
    'white-no-border': 'black',
    gray: 'black',
    grey: 'black',
    monochrome: 'monochrome',
    grayscale: 'grayscale',
    greyscale: 'grayscale'
};
