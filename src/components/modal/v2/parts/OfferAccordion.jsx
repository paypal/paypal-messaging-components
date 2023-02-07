/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const OfferAccordion = ({ offer: { content, meta }, aprDisclaimer, index, activeSelection, setActiveSelection }) => {
    const [open, setOpen] = useState('');
    const { termsLabel } = content;
    const currencySymbolFormat = str => {
        return str.replace(/(\s?EUR)/g, ' €');
    };

    useEffect(() => {
        if (index === 0) {
            requestAnimationFrame(() => {
                setOpen('open');
            });
        }
    }, []);

    return (
        <div id={`${index}`} className={`accordion__container ${activeSelection === index ? 'active' : ''} ${open}`}>
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
                    </div>
                    <div className="accordion__offer-field-header">{termsLabel?.offerNumInstallments}</div>
                </button>
            </div>
            <div className="accordion__collapsible">
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">{termsLabel?.eMoney}</div>
                    <div className="accordion__offer-field-value">
                        {currencySymbolFormat(meta?.formattedPeriodicPayment)}
                    </div>
                </div>
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">{termsLabel?.totalInterest}</div>
                    <div className="accordion__offer-field-value">
                        {currencySymbolFormat(meta?.formattedNominalRate)}
                    </div>
                </div>
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">{termsLabel?.total}</div>
                    <div className="accordion__offer-field-value">{currencySymbolFormat(meta?.formattedTotalCost)}</div>
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
    );
};

export default OfferAccordion;
