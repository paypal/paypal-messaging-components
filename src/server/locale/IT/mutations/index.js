// mutations import here.
import longTermQ from './long_term_q';
import longTermNq from './long_term_nq';
import shortTermQ from './short_term_q';
import shortTermNq from './short_term_nq';
import shortTermNoAmount from './short_term_no_amount';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLLT_MQ_GZ':
            return longTermQ[type];
        case 'PLLT_NQ_GZ':
            return longTermNq[type];
        case 'SHORT_TERM:Q':
        case 'PLST_SQ':
            return shortTermQ[type];
        case 'SHORT_TERM:NQ':
        case 'PLST_NQ':
            return shortTermNq[type];
        case 'SHORT_TERM:NO_AMOUNT':
        case 'PLST_NA':
        default:
            return shortTermNoAmount[type];
    }
}
