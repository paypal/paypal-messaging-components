/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import pi30_no_amount from './pi30';
import pi30_non_qual from './pi30nq';
import pi30q from './pi30q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI30Q':
            return pi30q[type];
        case 'PI30NQ':
            return pi30_non_qual[type];
        case 'PI30':
        default:
            return pi30_no_amount[type];
    }
}
