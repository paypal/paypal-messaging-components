// mutations import here.
import generic from './generic';
import longTermQ from './long_term_q_gtz';
import longTermNq from './long_term_nq_gtz';
import gpl from './gpl';
import gplq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLLT_MQ_GZ':
            return longTermQ[type];
        case 'PLLT_NQ_GZ':
            return longTermNq[type];
        case 'GPLQ':
        case 'PLST_SQ':
            return gplq[type];
        case 'GPL':
        case 'PLST_NQ':
            return gpl[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
