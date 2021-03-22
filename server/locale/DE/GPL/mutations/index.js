import gplEqz from './gpl_eqz';
import gplGtz from './gpl_gtz';
import gplqEqz from './gplq_eqz';
import gplqGtz from './gplq_gtz';

export default function getMutations(id, type) {
    switch (id) {
        case 'GPL:GTZ':
            return gplGtz[type];
        case 'GPLQ:EQZ':
            return gplqEqz[type];
        case 'GPLQ:GTZ':
            return gplqGtz[type];
        case 'GPL:EQZ':
        default:
            return gplEqz[type];
    }
}
