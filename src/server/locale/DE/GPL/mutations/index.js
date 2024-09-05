import gplEqz from './gpl_eqz';
import gplGtz from './gpl_gtz';
import gplqEqz from './gplq_eqz';
import gplqGtz from './gplq_gtz';
import gplEqzNonDe from './gpl_eqz-non-de';
import gplGtzNonDe from './gpl_gtz-non-de';
import gplqEqzNonDe from './gplq_eqz-non-de';
import gplqGtzNonDe from './gplq_gtz-non-de';
import generic from './generic';
import genericNonDe from './generic-non-de';

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
        case 'GPL:EQZ:NON-DE':
        case 'PLLT_NQ_EZ_NON-DE':
            return gplEqzNonDe[type];
        case 'GPL:GTZ:NON-DE':
        case 'PLLT_NQ_GZ_NON-DE':
            return gplGtzNonDe[type];
        case 'GPLQ:EQZ:NON-DE':
        case 'PLLT_MQ_EZ_NON-DE':
            return gplqEqzNonDe[type];
        case 'GPLQ:GTZ:NON-DE':
        case 'PLLT_MQ_GZ_NON-DE':
            return gplqGtzNonDe[type];
        case 'GPL:EQZ':
        case 'PLLT_NQ_EZ':
            return gplEqz[type];
        case 'GENERIC:NON-DE':
        case 'GENERIC_NON-DE':
            return genericNonDe[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
