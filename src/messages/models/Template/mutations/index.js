import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';

import ni from './ni';
import niNonUs from './ni_non-us';
import ezpAnyEqz from './ezp_any_eqz';
import ezpAnyGtz from './ezp_any_gtz';
import palaMultiEqz from './pala_multi_eqz';
import palaMultiGtz from './pala_multi_gtz';
import palaSingleEqz from './pala_single_eqz';
import palaSingleGtz from './pala_single_gtz';

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

export default function getMutations(id, type) {
    switch (id) {
        case 'EZP:ANY:EQZ':
            return ezpAnyEqz[type];
        case 'EZP:ANY:GTZ':
            return ezpAnyGtz[type];
        case 'PALA:MULTI:EQZ':
            return palaMultiEqz[type];
        case 'PALA:MULTI:GTZ':
            return palaMultiGtz[type];
        case 'PALA:SINGLE:EQZ':
            return palaSingleEqz[type];
        case 'PALA:SINGLE:GTZ':
            return palaSingleGtz[type];
        case 'NI:NON-US':
            return niNonUs[type];
        case 'NI':
        default:
            return ni[type];
    }
}
