/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import pi30 from './pi30';
import pi30nq from './pi30nq';
import pi30q from './pi30q';
import pi30nonDe from './pi30-non-de';
import pi30nqNonDe from './pi30nq-non-de';
import pi30qNonDe from './pi30q-non-de';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI30Q':
        case 'PLP1_SQ':
            return pi30q[type];
        case 'PI30NQ':
        case 'PLP1_NQ':
            return pi30nq[type];
        case 'PI30Q:NON-DE':
        case 'PLP1_SQ_XB':
            return pi30qNonDe[type];
        case 'PI30NQ:NON-DE':
        case 'PLP1_NQ_XB':
            return pi30nqNonDe[type];
        case 'PI30:NON-DE':
        case 'PLP1_NA_XB':
            return pi30nonDe[type];
        case 'PI30':
        case 'PLP1_NA':
        default:
            return pi30[type];
    }
}
