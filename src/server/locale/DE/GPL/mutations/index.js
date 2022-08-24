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
            return gplGtz[type];
        case 'GPLQ:EQZ':
            return gplqEqz[type];
        case 'GPLQ:GTZ':
            return gplqGtz[type];
        case 'GPL:EQZ:NON-DE':
            return gplEqzNonDe[type];
        case 'GPL:GTZ:NON-DE':
            return gplGtzNonDe[type];
        case 'GPLQ:EQZ:NON-DE':
            return gplqEqzNonDe[type];
        case 'GPLQ:GTZ:NON-DE':
            return gplqGtzNonDe[type];
        case 'GPL:EQZ':
            return gplEqz[type];
        case 'GENERIC:NON-DE':
            return genericNonDe[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
