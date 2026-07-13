const isSafeFontName = value => typeof value === 'string' && /^[\w\s-]+$/.test(value.trim());
const isSafeFontSource = value => typeof value === 'string' && /^https:\/\/[^'")\s]+$/i.test(value);

const formatFontFamilyName = val => {
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
