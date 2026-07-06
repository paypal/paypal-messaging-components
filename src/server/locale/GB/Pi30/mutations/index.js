import pi30nq from './pi30nq';
import pi30q from './pi30q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI30Q':
        case 'PLP1_SQ':
            return pi30q[type];
        case 'PI30NQ':
        case 'PLP1_NQ':
        default:
            return pi30nq[type];
    }
}
