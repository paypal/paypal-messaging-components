import US from './US';
import DE from './DE';
import GB from './GB';
import FR from './FR';
import ES from './ES';
import AU from './AU';
import IT from './IT';

const getLocaleSettings = (offerCountry, offerType, contextualComponents) => {
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
            return US(offerType, contextualComponents);
    }
};

export function getLocaleClass(locale, offerType, contextualComponents) {
    return getLocaleSettings(locale, offerType, contextualComponents).localeClass;
}

export function getLocaleProductName(locale, offerType, contextualComponents) {
    return getLocaleSettings(locale, offerType, contextualComponents).productName;
}

export function getValidOptions(locale, offerType, contextualComponents) {
    return getLocaleSettings(locale, offerType, contextualComponents).validOptions;
}

export function getMutations(locale, offerType, type, contextualComponents) {
    if (type === 'layout:custom') return {};
    const mutations = getLocaleSettings(locale, offerType, contextualComponents)
        .getMutations(offerType, type)
        .map(mutation => {
            if (mutation[1].styles) {
                return [
                    mutation[0],
                    {
                        ...mutation[1],
                        styles: mutation[1].styles.map(style =>
                            style.replace(
                                /\.message/g,
                                `.${getLocaleClass(locale, offerType, contextualComponents)} .message`
                            )
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

export function getLocaleStyles(locale, layout, offerType, contextualComponents) {
    return (
        (getLocaleSettings(locale, offerType, contextualComponents).styles &&
            getLocaleSettings(locale, offerType, contextualComponents).styles[layout]) ??
        []
    );
}
