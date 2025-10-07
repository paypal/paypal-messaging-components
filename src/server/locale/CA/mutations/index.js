/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import generic from './generic';
import shortTermNQ from './short_term_nq';
import shortTermQ from './short_term_q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLST_SQ':
            return shortTermQ[type];
        case 'PLST_NQ':
            return shortTermNQ[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
