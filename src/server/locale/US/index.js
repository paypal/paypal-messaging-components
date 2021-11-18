import gpl from './GPL/index';
import ppc from './PPC/index';
import payLaterLongTerm from './PAY_LATER_LONG_TERM/index';

export default offerType => {
    switch (offerType) {
        case 'GPL':
        case 'GPLQ':
        case 'GPLNQ':
        case 'GPLNQ_RANGE':
            return gpl;
        case 'LT_MQ':
        case 'LT_MQEZ':
        case 'LT_MQEZ_RB':
        case 'LT_NQ':
        case 'LT_NQEZ':
        case 'LT_SQ':
        case 'LT_SQEZ':
        case 'PAY_LATER_LONG_TERM':
            return payLaterLongTerm;
        default:
            return ppc;
    }
};
