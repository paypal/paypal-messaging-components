import payLaterShortTerm from './PAY_LATER_SHORT_TERM';
import paypalCredit from './PAYPAL_CREDIT';
import payLaterLongTerm from './PAY_LATER_LONG_TERM';
import Buttons from './CONTEXTUAL_COMPONENTS/BUTTONS';

import { OFFER, getStandardProductOffer } from '../../../utils/server';

export default (offerType, contextualComponents) => {
    // Buttons messages
    if (contextualComponents?.includes('BUTTON')) {
        return Buttons;
    }
    // Non-contextualComponents messages
    switch (getStandardProductOffer(offerType)) {
        case OFFER.PAYPAL_CREDIT_NO_INTEREST:
        case OFFER.PAYPAL_CREDIT_INSTALLMENTS:
            return paypalCredit;
        case OFFER.PAY_LATER_SHORT_TERM:
            return payLaterShortTerm;
        case OFFER.PAY_LATER_LONG_TERM:
        default:
            // Generic message is included with the long term mutations.
            // Default case catches GENERIC where getStandardProductOffer returns `undefined`
            return payLaterLongTerm;
    }
};
