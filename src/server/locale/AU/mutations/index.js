// mutations import here.
import gpl from './gpl';
import gplq from './gplq';

export default function getMutations(id, type) {
    switch (id) {
        case 'GPLQ':
        case 'PLST_SQ':
            return gplq[type];
        case 'GPL':
        case 'PLST_NQ':
        default:
            return gpl[type];
    }
}
