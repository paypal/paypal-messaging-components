// mutations import here.
import pl from './gpl';
import plq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLQ':
            return plq[type];
        case 'PL':
        default:
            return pl[type];
    }
}
