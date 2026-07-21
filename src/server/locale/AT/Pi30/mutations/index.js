/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import pi30 from './pi30';
import pi30nq from './pi30nq';
import pi30q from './pi30q';
import pi30nonAt from './pi30-non-at';
import pi30nqNonAt from './pi30nq-non-at';
import pi30qNonAt from './pi30q-non-at';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI30Q':
        case 'PLP1_SQ':
            return pi30q[type];
        case 'PI30NQ':
        case 'PLP1_NQ':
            return pi30nq[type];
        case 'PI30Q:NON-AT':
        case 'PLP1_SQ_XB':
            return pi30qNonAt[type];
        case 'PI30NQ:NON-AT':
        case 'PLP1_NQ_XB':
            return pi30nqNonAt[type];
        case 'PI30:NON-AT':
        case 'PLP1_NA_XB':
            return pi30nonAt[type];
        case 'PI30':
        case 'PLP1_NA':
        default:
            return pi30[type];
    }
}
