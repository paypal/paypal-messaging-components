// mutations import here.
import pl from './pl';
import plq from './plq';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLQ':
            return plq[type];
        case 'PL':
        default:
            return pl[type];
    }
}
