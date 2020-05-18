// mutations import here.
import pl from './pl';

export default function getMutations(id, type) {
    switch (id) {
        case 'PL':
        default:
            return pl[type];
    }
}
