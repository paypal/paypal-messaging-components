// mutations import here.
import shortTermQ from './short_term_q';
import shortTermNq from './short_term_nq';
import shortTermNoAmount from './short_term_no_amount';

export default function getMutations(id, type) {
    switch (id) {
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
