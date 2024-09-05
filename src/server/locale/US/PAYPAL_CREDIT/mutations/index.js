import niNQ from './ppc_ni_nq';
import niQ from './ppc_ni_q';
import niNQXB from './ppc_ni_nq_xb';
import niQXB from './ppc_ni_q_xb';
import ezpNQEQZ from './ppc_ezp_nq_eqz';
import ezpNQGTZ from './ppc_ezp_nq_gtz';
import ezpMultiEQZ from './ppc_ezp_multi_eqz';
import ezpMultiGTZ from './ppc_ezp_multi_gtz';
import ezpSingleEQZ from './ppc_ezp_single_eqz';
import ezpSingleGTZ from './ppc_ezp_single_gtz';

export default function getMutations(id, type) {
    switch (id) {
        case 'EZP:ANY:EQZ':
            return ezpNQEQZ[type];
        case 'EZP:ANY:GTZ':
            return ezpNQGTZ[type];
        case 'PALA:MULTI:EQZ':
            return ezpMultiEQZ[type];
        case 'PALA:MULTI:GTZ':
            return ezpMultiGTZ[type];
        case 'PALA:SINGLE:EQZ':
            return ezpSingleEQZ[type];
        case 'PALA:SINGLE:GTZ':
            return ezpSingleGTZ[type];
        case 'NIQ:NON-US':
        case 'PPCNI_SQ_NON-US':
            return niQXB[type];
        case 'NI:NON-US':
        case 'PPCNI_NQ_NON-US':
            return niNQXB[type];
        case 'NIQ':
        case 'PPCNI_SQ':
            return niQ[type];
        case 'NI':
        case 'PPCNI_NQ':
        default:
            return niNQ[type];
    }
}
