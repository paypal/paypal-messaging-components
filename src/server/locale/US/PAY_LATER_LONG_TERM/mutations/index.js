/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import lt_nqez from './lt_nqez';
import lt_nqgz from './lt_nqgz';
import lt_mqez from './lt_mqez';
import lt_mqgz from './lt_mqgz';
import lt_sqez from './lt_sqez';
import lt_sqgz from './lt_sqgz';
import generic from './generic';

export default function getMutations(id, type) {
    switch (id) {
        case 'LT_NQEZ':
            return lt_nqez[type];
        case 'LT_NQGZ':
            return lt_nqgz[type];
        case 'LT_MQEZ':
        case 'LT_MQEZ_RB':
            return lt_mqez[type];
        case 'LT_MQGZ':
            return lt_mqgz[type];
        case 'LT_SQEZ':
        case 'LT_SQEZ_RB':
            return lt_sqez[type];
        case 'LT_SQGZ':
            return lt_sqgz[type];
        case 'GENERIC':
        default:
            return generic[type];
    }
}
