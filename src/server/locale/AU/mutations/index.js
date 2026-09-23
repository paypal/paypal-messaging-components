// mutations import here.
import gpl from './gpl';
import gplq from './gplq';
import generic from './generic';
import longTermQGtz from './long_term_q_gtz';
import longTermQEqz from './long_term_q_eqz';
import longTermNqGtz from './long_term_nq_gtz';
import longTermNqEqz from './long_term_nq_eqz';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLLT_MQ_GZ':
            return longTermQGtz[type];
        case 'PLLT_MQ_EZ':
            return longTermQEqz[type];
        case 'PLLT_NQ_GZ':
            return longTermNqGtz[type];
        case 'PLLT_NQ_EZ':
            return longTermNqEqz[type];
        case 'GPLQ':
        case 'PLST_SQ':
            return gplq[type];
        case 'GENERIC':
        case 'PL_GENERIC':
            return generic[type];
        case 'GPL':
        case 'PLST_NQ':
        default:
            return gpl[type];
    }
}
