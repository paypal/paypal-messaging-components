import pi30 from './pi30';
import pi30q from './pi30q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI30Q':
            return pi30q[type];
        case 'PI30':
        default:
            return pi30[type];
    }
}
