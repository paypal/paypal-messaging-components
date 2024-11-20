import niNQ from './ppc_ni_nq';
import niQ from './ppc_ni_q';
import niNQXB from './ppc_ni_nq_xb';
import niQXB from './ppc_ni_q_xb';

export default function getMutations(id, type) {
    switch (id) {
        case 'NIQ:NON-US':
        case 'PPCNI_SQ_XB':
            return niQXB[type];
        case 'NI:NON-US':
        case 'PPCNI_NQ_XB':
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
