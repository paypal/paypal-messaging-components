// mutations import here.
import shortTermNoAmount from './short_term_no_amount';
import shortTermNq from './short_term_nq';
import shortTermQ from './short_term_q';

export default function getMutations(id, type) {
    switch (id) {
        case 'SHORT_TERM:Q':
            return shortTermQ[type];
        case 'SHORT_TERM:NQ':
            return shortTermNq[type];
        case 'SHORT_TERM:NO_AMOUNT':
        default:
            return shortTermNoAmount[type];
    }
}
