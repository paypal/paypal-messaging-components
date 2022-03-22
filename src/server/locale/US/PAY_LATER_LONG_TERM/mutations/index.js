/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import lt_nq from './lt_nq';
import lt_nqez from './lt_nqez';
import lt_mq from './lt_mq';
import lt_mqez from './lt_mqez';
import lt_sq from './lt_sq';
import lt_sqez from './lt_sqez';

export default function getMutations(id, type) {
    switch (id) {
        case 'LT_NQ_MIN':
        case 'LT_NQ_MAX':
            return lt_nq[type];
        case 'LT_NO_AMMT':
        case 'LT_NQEZ_MIN':
        case 'LT_NQEZ_MAX':
            return lt_nqez[type];
        case 'LT_SQ':
            return lt_sq[type];
        case 'LT_SQEZ':
        case 'LT_SQEZ_RB':
            return lt_sqez[type];
        case 'LT_MQEZ':
        case 'LT_MQEZ_RB':
            return lt_mqez[type];
        case 'LT_MQ':
        default:
            return lt_mq[type];
    }
}
