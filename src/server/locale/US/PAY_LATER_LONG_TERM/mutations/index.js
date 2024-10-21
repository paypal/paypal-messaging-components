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
        case 'PLLT_NQ_EZ':
            return longTermNQEQZ[type];
        case 'LT_NQGZ':
        case 'PLLT_NQ_GZ':
            return longTermNQGTZ[type];
        case 'LT_MQEZ':
        case 'PLLT_MQ_EZ':
            return longTermMultiEQZ[type];
        case 'LT_MQGZ':
        case 'PLLT_MQ_GZ':
            return longTermMultiGTZ[type];
        case 'LT_SQEZ':
        case 'PLLT_SQ_EZ':
            return longTermSingleEQZ[type];
        case 'LT_SQGZ':
        case 'PLLT_SQ_GZ':
            return longTermSingleGTZ[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
