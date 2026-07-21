import gplEqz from './gpl_eqz';
import gplGtz from './gpl_gtz';
import gplqEqz from './gplq_eqz';
import gplqGtz from './gplq_gtz';
import gplEqzNonAt from './gpl_eqz-non-at';
import gplGtzNonAt from './gpl_gtz-non-at';
import gplqEqzNonAt from './gplq_eqz-non-at';
import gplqGtzNonAt from './gplq_gtz-non-at';
import generic from './generic';
import genericNonAt from './generic-non-at';

export default function getMutations(id, type) {
    switch (id) {
        case 'GPL:GTZ':
        case 'PLLT_NQ_GZ':
            return gplGtz[type];
        case 'GPLQ:EQZ':
        case 'PLLT_MQ_EZ':
            return gplqEqz[type];
        case 'GPLQ:GTZ':
        case 'PLLT_MQ_GZ':
            return gplqGtz[type];
        case 'GPL:EQZ:NON-AT':
        case 'PLLT_NQ_EZ_XB':
            return gplEqzNonAt[type];
        case 'GPL:GTZ:NON-AT':
        case 'PLLT_NQ_GZ_XB':
            return gplGtzNonAt[type];
        case 'GPLQ:EQZ:NON-AT':
        case 'PLLT_MQ_EZ_XB':
            return gplqEqzNonAt[type];
        case 'GPLQ:GTZ:NON-AT':
        case 'PLLT_MQ_GZ_XB':
            return gplqGtzNonAt[type];
        case 'GPL:EQZ':
        case 'PLLT_NQ_EZ':
            return gplEqz[type];
        case 'GENERIC:NON-AT':
        case 'GENERIC_XB':
            return genericNonAt[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
