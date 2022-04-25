import payLaterShortTerm from './PAY_LATER_SHORT_TERM';
import paypalCredit from './PAYPAL_CREDIT';
import payLaterLongTerm from './PAY_LATER_LONG_TERM';

import { OFFER, getStandardProductOffer } from '../../../utils/server';

export default offerType => {
    switch (getStandardProductOffer(offerType)) {
        case OFFER.PAYPAL_CREDIT_NO_INTEREST:
        case OFFER.PAYPAL_CREDIT_INSTALLMENTS:
            return paypalCredit;
        case OFFER.PAY_LATER_SHORT_TERM:
            return payLaterShortTerm;
        case OFFER.PAY_LATER_LONG_TERM:
        default:
            return payLaterLongTerm;
    }
};
