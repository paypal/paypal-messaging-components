// mutations import here.
import pl from './gpl';
import plq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLQ':
        case 'PLST_SQ':
            return plq[type];
        case 'PL':
        case 'PLST_NQ':
        default:
            return pl[type];
    }
}
