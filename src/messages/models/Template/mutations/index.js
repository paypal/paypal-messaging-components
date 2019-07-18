import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';

import ni from './ni';
import niNonUs from './ni:non-us';
import ezpAnyEqz from './ezp:any:eqz';
import ezpAnyGtz from './ezp:any:gtz';
import palaMultiEqz from './pala:multi:eqz';
import palaMultiGtz from './pala:multi:gtz';
import palaSingleEqz from './pala:single:eqz';
import palaSingleGtz from './pala:single:gtz';

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
