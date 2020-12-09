import US from './US';
import DE from './DE';
import GB from './GB';
import FR from './FR';

const getLocaleSettings = (offerCountry, offerType) => {
    switch (offerCountry) {
        case 'DE':
            return DE;
        case 'GB':
            return GB;
        case 'FR':
            return FR;
        case 'US':
        default:
            return US(offerType);
    }
};

export function getLocaleClass(locale, offerType) {
    return getLocaleSettings(locale, offerType).localeClass;
}

export function getLocaleProductName(locale, offerType) {
    return getLocaleSettings(locale, offerType).productName;
}

export function getValidOptions(locale, offerType) {
    return getLocaleSettings(locale, offerType).validOptions;
}

export function getMutations(locale, offerType, type) {
    if (type === 'layout:custom') return {};
    const mutations = getLocaleSettings(locale, offerType)
        .getMutations(offerType, type)
        .map(mutation => {
            if (mutation[1].styles) {
                return [
                    mutation[0],
                    {
                        ...mutation[1],
                        styles: mutation[1].styles.map(style =>
                            style.replace(/\.message/g, `.${getLocaleClass(locale, offerType)} .message`)
                        )
                    }
                ];
            }

            return mutation;
        });

    return mutations;
}

export function getLogos(locale, offerType) {
    return getLocaleSettings(locale, offerType).logos;
}

export function getLocaleStyles(locale, layout, offerType) {
    return (getLocaleSettings(locale, offerType).styles && getLocaleSettings(locale, offerType).styles[layout]) ?? [];
}

export function getMinimumWidthOptions(locale, offerType) {
    return getLocaleSettings(locale, offerType).minimumSizeOptions ?? {};
}
