/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import shortTermNQ from './short_term_nq';
import shortTermQ from './short_term_q';

export default function getMutations(id, type) {
    switch (id) {
        case 'GPLQ':
        case 'PLST_SQ':
            return shortTermQ[type];
        case 'GPLNQ':
        case 'PLST_NQ':
        default:
            return shortTermNQ[type];
    }
}
