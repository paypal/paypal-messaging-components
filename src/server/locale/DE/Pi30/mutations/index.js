/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import pi30 from './pi30';
import pi30nq from './pi30nq';
import pi30q from './pi30q';
import pi30nonDe from './pi30-non-de';
import pi30nqNonDe from './pi30nq-non-de';
import pi30qNonDe from './pi30q-non-de';

export default function getMutations(id, type) {
    console.log('hello here', id, type);
    switch (id) {
        case 'PI30Q':
        case 'PLPI1_SQ':
            return pi30q[type];
        case 'PI30NQ':
        case 'PLPI1_NQ':
            return pi30nq[type];
        case 'PI30Q:NON-DE':
        case 'PLPI1_SQ_NON-DE':
            return pi30qNonDe[type];
        case 'PI30NQ:NON-DE':
        case 'PLPI1_NQ_NON-DE':
            return pi30nqNonDe[type];
        case 'PI30:NON-DE':
        case 'PLPI1_NA_NON-DE':
            return pi30nonDe[type];
        case 'PI30':
        case 'PLPI1_NA':
        default:
            return pi30[type];
    }
}
