import US from './US';
import DE from './DE';

// Webpack will not properly tree-shake switch statements
const LOCALE_SETTINGS = (() => {
    if (__MESSAGES__.__LOCALE__ === 'US') {
        return US;
    }

    if (__MESSAGES__.__LOCALE__ === 'DE') {
        return DE;
    }

    return null;
})();

export function getLocalProductName() {
    return LOCALE_SETTINGS.productName;
}

export function getValidOptions() {
    return LOCALE_SETTINGS.validOptions;
}

export function getMutations(id, type) {
    const localeClass = `.locale--${__MESSAGES__.__LOCALE__} .message`;
    const mutations = LOCALE_SETTINGS.getMutations(id, type).map(mutation => {
        if (mutation[1].styles) {
            return [
                mutation[0],
                {
                    ...mutation[1],
                    styles: mutation[1].styles.map(style => style.replace(/\.message/g, localeClass))
                }
            ];
        }

        return mutation;
    });

    return mutations;
}

export function getLogos() {
    return LOCALE_SETTINGS.logos;
}

export function getLocaleStyles(layout) {
    return (LOCALE_SETTINGS.styles && LOCALE_SETTINGS.styles[layout]) || [];
}
