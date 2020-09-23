import ni from './ni';
import niQ from './niq';
import niNonUs from './ni_non-us';
import niQNonUs from './niq_non-us';
import ezpAnyEqz from './ezp_any_eqz';
import ezpAnyGtz from './ezp_any_gtz';
import palaMultiEqz from './pala_multi_eqz';
import palaMultiGtz from './pala_multi_gtz';
import palaSingleEqz from './pala_single_eqz';
import palaSingleGtz from './pala_single_gtz';

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
        case 'NIQ:NON-US':
            return niQNonUs[type];
        case 'NI:NON-US':
            return niNonUs[type];
        case 'NIQ':
            return niQ[type];
        case 'NI':
        default:
            return ni[type];
    }
}
