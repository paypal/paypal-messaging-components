// mutations import here.
import gpl from './gpl';
import gplq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'PLQ':
            return gplq[type];
        case 'PL':
        default:
            return gpl[type];
    }
}
