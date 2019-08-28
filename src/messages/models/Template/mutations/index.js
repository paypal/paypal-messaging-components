import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';

import getUSMutations from './US/index';
import getDEMutations from './DE/index';

export function getDataByTag(data, tag) {
    let selected = arrayFind(data, ([, tags]) => arrayIncludes(tags, tag));
    if (selected) {
        return selected[0];
    }

    if (stringIncludes(tag, '.')) {
        const [fallbackTag] = tag.split('.', 1);
        selected = arrayFind(data, ([, tags]) => arrayIncludes(tags, fallbackTag));
        if (selected) {
            return selected[0];
        }
    }

    return arrayFind(data, ([, tags]) => arrayIncludes(tags, 'default'))[0];
}

export default function getMutations(country, id, type) {
    // Webpack will not properly tree-shake a switch block
    if (__MESSAGES__.__LOCALE__ === 'DE') {
        return getDEMutations(id, type);
    }

    if (__MESSAGES__.__LOCALE__ === 'US') {
        return getUSMutations(id, type);
    }

    return null;
}
