/** @jsx h */
import { h } from 'preact';

const OfferCard = ({ offer: { content, meta }, useV4Design, useV5Design, useNewCheckoutDesign }) => {
    const { termsLabel } = content;
    const aprRemoveTrailingZeros = meta?.apr.replace(/\D00$/, '');
    const aprFieldTitle = aprRemoveTrailingZeros === '0' ? termsLabel?.zeroApr : termsLabel?.nonZeroApr;
    const offerHeaderField = termsLabel?.offerHeader;

    return (
        <div className="offer__container">
            <div className={`offer__row ${useV5Design === 'true' ? 'v5Design' : ''}`}>
                <strong
                    className="offer__field-header"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: offerHeaderField }}
                />
            </div>
            <div className={`offer__row ${useV5Design === 'true' ? 'v5Design' : ''}`}>
                <div className="offer__field-col">
                    <p
                        className={`offer__field-title ${useV5Design === 'true' ? 'v5Design' : ''}`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: aprFieldTitle }}
                    />
                    <div className="offer__field-value">{aprRemoveTrailingZeros}%</div>
                </div>
                <div className="offer__field-col">
                    <p className={`offer__field-title ${useV5Design === 'true' ? 'v5Design' : ''}`}>
                        {termsLabel?.totalInterest}
                    </p>
                    <p className="offer__field-value">{meta?.formattedTotalInterest}</p>
                </div>
                <div className="offer__field-col">
                    <strong
                        className={`offer__field-title ${useV4Design === 'true' ? 'v4Design' : ''} ${
                            useNewCheckoutDesign === 'true' ? 'checkout' : ''
                        }`}
                    >
                        {termsLabel?.total}
                    </strong>
                    <strong className="offer__field-value">{meta?.formattedTotalCost}</strong>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
