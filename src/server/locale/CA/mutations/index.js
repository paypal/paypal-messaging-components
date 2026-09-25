/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import generic from './generic';
import shortTermNQ from './short_term_nq';
import shortTermQ from './short_term_q';
import longTermQ from './long_term_q_gtz';
import longTermNQ from './long_term_nq_gtz';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLLT_MQ_GZ':
            return longTermQ[type];
        case 'PLLT_NQ_GZ':
            return longTermNQ[type];
        case 'PLST_SQ':
            return shortTermQ[type];
        case 'PLST_NQ':
            return shortTermNQ[type];
        case 'GENERIC':
        case 'PL_GENERIC':
        default:
            return generic[type];
    }
}
