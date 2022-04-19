/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { currencyFormat } from '../lib';
import InlineLinks from './InlineLinks';
// TODO: Look into currencyFormat regex and tweak as necessary once we pull from stage

const OfferAccordion = ({ offer: { content, meta }, aprDisclaimer, index, activeSelection, setActiveSelection }) => {
    const [open, setOpen] = useState('');
    const { termsLabel } = content;

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
                    <div className="accordion__offer-field-header ">{termsLabel?.offerPayment}</div>
                    <div className="accordion__offer-field-header">{termsLabel?.offerNumInstallments}</div>
                </button>
            </div>
            <div className="accordion__collapsible">
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">
                        <InlineLinks text={termsLabel?.eMoney} />
                    </div>
                    <div className="accordion__offer-field-value">{currencyFormat(meta?.formattedPeriodicPayment)}</div>
                </div>
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">{termsLabel?.totalInterest}</div>
                    <div className="accordion__offer-field-value">{currencyFormat(meta?.formattedTotalInterest)}</div>
                </div>
                <div className="accordion__row">
                    <div className="accordion__offer-field-title">{termsLabel?.total}</div>
                    <div className="accordion__offer-field-value">{currencyFormat(meta?.formattedTotalCost)}</div>
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
