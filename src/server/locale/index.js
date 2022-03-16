import US from './US';
import DE from './DE';
import GB from './GB';
import FR from './FR';
import ES from './ES';
import AU from './AU';
import IT from './IT';

const getLocaleSettings = (offerCountry, offerType) => {
    switch (offerCountry) {
        case 'DE':
            return DE(offerType);
        case 'GB':
            return GB;
        case 'ES':
            return ES;
        case 'FR':
            return FR;
        case 'AU':
            return AU;
        case 'IT':
            return IT;
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
