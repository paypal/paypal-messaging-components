/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import lt_nq from './lt_nq';
import lt_nqez from './lt_nqez';
import lt_mq from './lt_mq';
import lt_sq from './lt_sq';
import lt_sqez from './lt_sqez';

export default function getMutations(id, type) {
    switch (id) {
        case 'LT_NQ':
            return lt_nq[type];
        case 'LT_NQEZ':
            return lt_nqez[type];
        case 'LT_SQ':
            return lt_sq[type];
        case 'LT_SQEZ':
            return lt_sqez[type];
        case 'LT_MQ':
        case 'LT_MQEZ':
        case 'LT_MQEZ_RB':
        default:
            return lt_mq[type];
    }
}
