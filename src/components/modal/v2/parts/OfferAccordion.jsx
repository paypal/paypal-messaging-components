/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { delocalize, localize } from '../lib';
import Icon from './Icon';

const OfferAccordion = ({
    offer: { content, meta },
    useV5Design,
    use5Dot1Design,
    aprDisclaimer,
    index,
    activeSelection,
    setActiveSelection,
    offerCountry
}) => {
    const [open, setOpen] = useState('');
    const { termsLabel } = content;
    const currencySymbolFormat = str => {
        let result = str?.replace(/(\s?EUR)/g, ' €') ?? '';
        if (offerCountry === 'AT' && result) {
            // Reformat the numeric part using the locale's number style so the thousands separator
            // matches what the calculator input field displays (de-AT number format uses narrow
            // no-break space, whereas de-AT currency format uses period).
            const withoutSymbol = result.replace(/\s*€/, '').trim();
            const numericValue = parseFloat(delocalize(withoutSymbol, offerCountry));
            if (!Number.isNaN(numericValue)) {
                result = `${localize(numericValue, offerCountry, 2)} €`;
            }
        }
        return result;
    };

    useEffect(() => {
        if (index === 0) {
            requestAnimationFrame(() => {
                setOpen('open');
            });
        }
    }, []);

    return (
        <div
            id={index}
            className={`accordion__container ${activeSelection === index ? 'active' : ''} ${open} ${
                useV5Design === 'true' ? 'v5Design' : ''
            } ${use5Dot1Design ? 'v5Dot1Design' : ''} ${offerCountry || ''}`}
        >
            <div className="accordion__content">
                <div className="accordion__row">
                    <button
                        className="accordion__header-container"
                        type="button"
                        onClick={() => {
                            setActiveSelection(index);
                            setOpen(open ? '' : 'open');
                        }}
                    >
                        <div className="accordion__offer-field-header ">
                            {currencySymbolFormat(termsLabel?.offerPayment)}
                            {offerCountry === 'IT' || offerCountry === 'ES' ? '*' : ''}
                        </div>
                        <div className="accordion__offer-field-header">{termsLabel?.offerNumInstallments}</div>
                    </button>
                </div>
                <div className="accordion__collapsible">
                    <div className="accordion__row">
                        <div className="accordion__offer-field-title">{termsLabel?.eMoney}</div>
                        <div className="accordion__offer-field-value">
                            {currencySymbolFormat(meta?.formattedTransactionAmount)}
                        </div>
                    </div>
                    <div className="accordion__row">
                        <div className="accordion__offer-field-title">{termsLabel?.totalInterest}</div>
                        <div className="accordion__offer-field-value">
                            {currencySymbolFormat(meta?.formattedTotalInterest)}
                        </div>
                    </div>
                    {termsLabel?.otherCosts && (
                        <div className="accordion__row">
                            <div className="accordion__offer-field-title">{termsLabel?.otherCosts}</div>
                            <div className="accordion__offer-field-value">{meta?.otherCosts}</div>
                        </div>
                    )}
                    <div className="accordion__row">
                        <div className="accordion__offer-field-title">{termsLabel?.total}</div>
                        <div className="accordion__offer-field-value">
                            {currencySymbolFormat(meta?.formattedTotalCost)}
                        </div>
                    </div>
                    <div className="accordion__row">
                        <div
                            className="accordion__offer-apr-disclaimer"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: aprDisclaimer }}
                        />
                    </div>
                </div>
            </div>
            {(offerCountry === 'IT' || offerCountry === 'ES') && (
                <button
                    className="accordion__chevron-col"
                    type="button"
                    onClick={() => {
                        setActiveSelection(index);
                        setOpen(open ? '' : 'open');
                    }}
                >
                    <div className="accordion__chevron">
                        <Icon name={`chevron-${open ? 'up' : 'down'}`} />
                    </div>
                </button>
            )}
        </div>
    );
};

export default OfferAccordion;
