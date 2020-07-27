import US from './US';
import DE from './DE';
import GB from './GB';

const getLocaleSettings = offerCountry => {
    switch (offerCountry) {
        case 'DE':
            return DE;
        case 'GB':
            return GB;
        case 'US':
        default:
            return US;
    }
};

export function getLocaleClass(locale) {
    return getLocaleSettings(locale).localeClass;
}

export function getLocalProductName(locale) {
    return getLocaleSettings(locale).productName;
}

export function getValidOptions(locale) {
    return getLocaleSettings(locale).validOptions;
}

export function getMutations(locale, id, type) {
    const mutations = getLocaleSettings(locale)
        .getMutations(id, type)
        .map(mutation => {
            if (mutation[1].styles) {
                return [
                    mutation[0],
                    {
                        ...mutation[1],
                        styles: mutation[1].styles.map(style =>
                            style.replace(/\.message/g, `.${getLocaleClass(locale)} .message`)
                        )
                    }
                ];
            }

            return mutation;
        });

    return mutations;
}

export function getLogos(locale) {
    return getLocaleSettings(locale).logos;
}

export function getLocaleStyles(locale, layout) {
    return (getLocaleSettings(locale).styles && getLocaleSettings(locale).styles[layout]) ?? [];
}

export function getMinimumWidthOptions(locale) {
    return getLocaleSettings(locale).minimumSizeOptions ?? {};
}
