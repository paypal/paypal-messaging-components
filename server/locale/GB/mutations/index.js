// mutations import here.
import gpl from './gpl';
import gplq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'GPLQ':
            return gplq[type];
        case 'GPL':
        default:
            return gpl[type];
    }
}
