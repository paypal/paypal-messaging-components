/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
import longTermNQEQZ from './long_term_nq_eqz';
import longTermNQGTZ from './long_term_nq_gtz';
import longTermMultiEQZ from './long_term_multi_eqz';
import longTermMultiGTZ from './long_term_multi_gtz';
import longTermSingleEQZ from './long_term_single_eqz';
import longTermSingleGTZ from './long_term_single_gtz';
import shortTermSingleQ from './short_term_q';
import shortTermSingleNQ from './short_term_nq';
import genericPayLater from './generic_pay_later';
import genericPayLaterBNPL from './generic_pay_later_bnpl';
import genericPayPal from './generic_paypal';

export default function getMutations(id, type) {
    switch (id) {
        // Long Term messages
        // Long Term Non-qualifying at 0% APR
        case 'LT_NQEZ':
            return longTermNQEQZ[type];
        // Long Term Non-qualifying non-0% APR
        case 'LT_NQGZ':
            return longTermNQGTZ[type];
        // Long Term multiple qualifying offers at 0% APR
        case 'LT_MQEZ':
            return longTermMultiEQZ[type];
        // Long Term multiple qualifying offers non-0% APR
        case 'LT_MQGZ':
            return longTermMultiGTZ[type];
        // Long Term single qualifying offer at 0% APR
        case 'LT_SQEZ':
            return longTermSingleEQZ[type];
        // Long Term single qualifying offer non-0% APR
        case 'LT_SQGZ':
            return longTermSingleGTZ[type];
        // Short Term messages
        // Short Term Qualifying
        case 'ST_SQ':
            return shortTermSingleQ[type];
        // Short Term Non-qualifying
        case 'ST_NQ':
            return shortTermSingleNQ[type];
        // Generic Messages
        // Generic Pay Later message
        case 'GENERIC_PL':
            return genericPayLater[type];
        // // Generic Pay Later - Buy now, Pay Later message
        case 'GENERIC_PL_BNPL':
            return genericPayLaterBNPL[type];
        // // Generic PayPal message
        case 'GENERIC_PAYPAL':
        default:
            return genericPayPal[type];
    }
}
