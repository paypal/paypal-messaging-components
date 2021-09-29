/** @jsx h */
import { h } from 'preact';

const OfferCard = ({ termsLabel, offer, index }) => {
    return (
        <div className={`offer__container ${index}`}>
            <div className="offer__row">
                <div className="offer__field-header">
                    {/* TODO: Dynamically pull /mo., for, and months from json */}${offer.periodic}/mo. for {offer.term}{' '}
                    months
                </div>
            </div>
            <div className="offer__row">
                <div className="offer__field-col">
                    <p className="offer__field-title">{termsLabel.apr}</p>
                    <div className="offer__field-value">{offer.apr}%</div>
                </div>
                <div className="offer__field-col">
                    <p className="offer__field-title">{termsLabel.totalInterest}</p>
                    <p className="offer__field-value">{offer.totalInterest} </p>
                </div>
                <div className="offer__field-col">
                    <p className="offer__field-title">{termsLabel.total}</p>
                    <strong className="offer__field-value">{offer.total}</strong>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
