import gpl from './GPL';
import pi30 from './Pi30';
import { OFFER, getStandardProductOffer } from '../../../utils/server';

export default function getLocaleSettings(offerType) {
    switch (getStandardProductOffer(offerType)) {
        case OFFER.PAY_LATER_PAY_IN_1:
            return pi30;
        case OFFER.PAY_LATER_SHORT_TERM:
        default:
            return gpl;
    }
}
