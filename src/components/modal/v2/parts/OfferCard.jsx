/** @jsx h */
import { h } from 'preact';

const OfferCard = ({ offer: { content, meta }, index }) => {
    const { termsLabel } = content;
    const aprRemoveTrailingZeros = meta?.apr.replace(/([^\d]00)(?=[^\d]|$)/, '');

    return (
        <div className={`offer__container ${index}`}>
            <div className="offer__row">
                <div className="offer__field-header">
                    <div className="offer__field-header">{termsLabel.offerHeader}</div>
                </div>
            </div>
            <div className="offer__row">
                <div className="offer__field-col">
                    <p className="offer__field-title">
                        {aprRemoveTrailingZeros === '0' ? termsLabel?.zeroApr : termsLabel?.nonZeroApr}
                    </p>
                    <div className="offer__field-value">{aprRemoveTrailingZeros}%</div>
                </div>
                <div className="offer__field-col">
                    <p className="offer__field-title">{termsLabel?.totalInterest}</p>
                    <p className="offer__field-value">{meta?.formattedTotalInterest}</p>
                </div>
                <div className="offer__field-col">
                    <p className="offer__field-title">{termsLabel?.total}</p>
                    <strong className="offer__field-value">{meta?.formattedTotalCost}</strong>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
