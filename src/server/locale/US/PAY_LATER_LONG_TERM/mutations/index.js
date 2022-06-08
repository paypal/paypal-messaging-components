/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import longTermNQEQZ from './long_term_nq_eqz';
import longTermNQGTZ from './long_term_nq_gtz';
import longTermMultiEQZ from './long_term_multi_eqz';
import longTermMultiGTZ from './long_term_multi_gtz';
import longTermSingleEQZ from './long_term_single_eqz';
import longTermSingleGTZ from './long_term_single_gtz';
import generic from './generic';

export default function getMutations(id, type) {
    switch (id) {
        case 'LT_NQEZ':
            return longTermNQEQZ[type];
        case 'LT_NQGZ':
            return longTermNQGTZ[type];
        case 'LT_MQEZ':
            return longTermMultiEQZ[type];
        case 'LT_MQGZ':
            return longTermMultiGTZ[type];
        case 'LT_SQEZ':
            return longTermSingleEQZ[type];
        case 'LT_SQGZ':
            return longTermSingleGTZ[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
