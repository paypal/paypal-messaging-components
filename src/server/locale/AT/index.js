import gpl from './GPL/index';
import pi30 from './Pi30/index';
import { OFFER, getStandardProductOffer } from '../../../utils/server';

export default offerType => {
    switch (getStandardProductOffer(offerType)) {
        case OFFER.PAY_LATER_PAY_IN_1:
            return pi30;
        case OFFER.PAY_LATER_SHORT_TERM:
        default:
            // Generic message is included with the gpl mutations.
            // Default case catches GENERIC where getStandardProductOffer returns `undefined`
            return gpl;
    }
};
