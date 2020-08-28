import US from './US';
import DE from './DE';
import GB from './GB';

const getLocaleSettings = (offerCountry, id) => {
    switch (offerCountry) {
        case 'DE':
            return DE;
        case 'GB':
            return GB;
        case 'US':
        default:
            return US(id);
    }
};

export function getLocaleClass(locale, id) {
    return getLocaleSettings(locale, id).localeClass;
}

export function getLocalProductName(locale, id) {
    return getLocaleSettings(locale, id).productName;
}

export function getValidOptions(locale) {
    return getLocaleSettings(locale, '').validOptions;
}

export function getMutations(locale, id, type, options) {
    if (type === 'layout:custom') return {};
    const mutations = getLocaleSettings(locale, id)
        .getMutations(id, type, options)
        .map(mutation => {
            if (mutation[1].styles) {
                return [
                    mutation[0],
                    {
                        ...mutation[1],
                        styles: mutation[1].styles.map(style =>
                            style.replace(/\.message/g, `.${getLocaleClass(locale, id)} .message`)
                        )
                    }
                ];
            }

            return mutation;
        });

    return mutations;
}

export function getLogos(locale, id) {
    return getLocaleSettings(locale, id).logos;
}

export function getLocaleStyles(locale, layout, id) {
    return (getLocaleSettings(locale, id).styles && getLocaleSettings(locale, id).styles[layout]) ?? [];
}

export function getMinimumWidthOptions(locale, id) {
    return getLocaleSettings(locale, id).minimumSizeOptions ?? {};
}
