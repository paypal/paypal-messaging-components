import { createState } from '../utils/miscellaneous';

import US from './US';
import DE from './DE';

const getLocaleSettings = offerCountry => {
    switch (offerCountry) {
        case 'DE':
            return DE;
        case 'US':
        default:
            return US;
    }
};

const [localeSettings, updateLocaleSettings] = createState({});

export const setLocale = offerCountry => updateLocaleSettings(getLocaleSettings(offerCountry));

export function getLocaleClass() {
    return localeSettings.localeClass;
}

export function getLocalProductName() {
    return localeSettings.productName;
}

export function getValidOptions() {
    return localeSettings.validOptions;
}

export function getMutations(id, type) {
    const mutations = localeSettings.getMutations(id, type).map(mutation => {
        if (mutation[1].styles) {
            return [
                mutation[0],
                {
                    ...mutation[1],
                    styles: mutation[1].styles.map(style =>
                        style.replace(/\.message/g, `.${getLocaleClass()} .message`)
                    )
                }
            ];
        }

        return mutation;
    });

    return mutations;
}

export function getLogos() {
    return localeSettings.logos;
}

export function getLocaleStyles(layout) {
    return (localeSettings.styles && localeSettings.styles[layout]) || [];
}

export function getMinimumWidthOptions() {
    return localeSettings.minimumSizeOptions || {};
}
