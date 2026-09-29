let customFontCounter = 1;

/**
 * Create a font-face css rule for a given value fontSource value
 * @param {string} val - the fontSource value the merchant wishes to use
 * @returns {string} result
 */
const generateFontFaceRule = value => {
    const name = `Merchant Custom Font ${customFontCounter}`;
    customFontCounter += 1;
    return {
        name: `'${name}'`,
        rule: `@font-face {
     font-family: '${name}';
     src: url('${value}');
}`
    };
};

/**
 * Format a fontFamily value
 * @param {string} val - the font-family value the merchant wishes to use
 * @returns {string} result
 */
const formatFontFamilyName = val => {
    // using a generic family requires the value not be quoted
    const genericFamilies = {
        serif: 'serif',
        'sans-serif': 'sans-serif',
        monospace: 'monospace',
        cursive: 'cursive',
        fantasy: 'fantasy',
        'system-ui': 'system-ui',
        'ui-serif': 'ui-serif',
        'ui-sans-serif': 'ui-sans-serif',
        'ui-monospace': 'ui-monospace'
    };
    return genericFamilies[val] ?? `'${val}'`;
};

/**
 * Parse the style.text.size option
 * @param {Object} options
 * @param {string} layout - the layout style
 * @param {number} size - the font size
 * @returns {undefined|string} result
 */
const parseTextSize = ({ layout, size }) => {
    if (layout !== 'flex' && typeof size !== 'undefined' && !Number.isNaN(size) && size >= 10 && size <= 16) {
        return `${size}`;
    }
    return undefined;
};

/**
 * Return the css to stylize the text used for the message
 * @param {Object} style - the style query parameter (after the server has validated it)
 * @returns {string[]} result - an array of the css rules to customize the font
 */
export const getFontRules = style => {
    customFontCounter = 0;
    const fontFamilyFallbacks = ['Helvetica', 'Arial', 'sans-serif'];
    const fontSelector = [
        '.message__messaging', // text layout
        '.message__messaging .message__headline span', // flex layout
        '.message__messaging .message__sub-headline span',
        '.message__messaging .message__disclaimer span'
    ].join(',\n');
    const rules = [];
    const { layout, text: { size, fontSource: fontSourceStyle, fontFamily: fontFamilyStyle } = {} } = style;
    const textSize = parseTextSize({ layout, size });
    const fontSource = Array.isArray(fontSourceStyle) ? fontSourceStyle : [];
    const fontFamily = Array.isArray(fontFamilyStyle) ? fontFamilyStyle : [];

    const customFontSourceNames = fontSource.map(value => {
        const { name, rule } = generateFontFaceRule(value);
        rules.push(rule);
        return name;
    });

    const customFontFamilyNames = [...customFontSourceNames, ...fontFamily.map(val => formatFontFamilyName(val))];

    if (customFontFamilyNames || textSize) {
        const fontFamilyRule =
            customFontFamilyNames.length === 0
                ? ''
                : `font-family: ${[...customFontFamilyNames, ...fontFamilyFallbacks].join(', ')};\n`;
        const textSizeRule = typeof textSize !== 'undefined' ? `font-size: ${textSize}px;` : '';
        rules.push(`${fontSelector}{ ${fontFamilyRule}${textSizeRule} }`);
    }
    return rules;
};

// Shared validation and @font-face generation for v2 stylesheet.
const isSafeFontName = value => typeof value === 'string' && /^[\w\s-]+$/.test(value.trim());
// https-only, and no characters that can escape a CSS url('...') or break an HTML <style> tag.
const isSafeFontSource = value => typeof value === 'string' && /^https:\/\/[^'"<>\\;()\s]+$/i.test(value);

export function buildFontRules({ fontSource, fontFamily, fallbackStack, defaultFontFamily, fontNamePrefix }) {
    const sources = Array.isArray(fontSource) ? fontSource.filter(isSafeFontSource) : [];
    const families = Array.isArray(fontFamily) ? fontFamily.filter(isSafeFontName).map(formatFontFamilyName) : [];

    const fontFaceRules = sources
        .map((url, i) => `@font-face { font-family: '${fontNamePrefix} ${i + 1}'; src: url('${url}'); }`)
        .join('\n');

    const customSourceNames = sources.map((_, i) => `'${fontNamePrefix} ${i + 1}'`);

    const effectiveFontFamily =
        customSourceNames.length > 0 || families.length > 0
            ? [...customSourceNames, ...families, fallbackStack].join(', ')
            : defaultFontFamily;

    return { fontFaceRules, effectiveFontFamily };
}
