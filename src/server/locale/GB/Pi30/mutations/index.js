// mutations import here.
import pay30nq from './pay30nq';
import pay30q from './pay30q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLP1_SQ':
            return pay30q[type];
        case 'PLP1_NQ':
        default:
            return pay30nq[type];
    }
}
