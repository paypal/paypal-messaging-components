/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib/hooks';
import Button from '../../Button';
import TermsTable from './TermsTable';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="calculator__title">Monatliche Raten berechnen</h3>
                <form className="calculator__form" onSubmit={submit}>
                    <input className="calculator__input" value={value} onInput={changeInput} />
                    <p className="calculator__instructions">
                        {!terms.error &&
                            terms.formattedMinAmount &&
                            terms.formattedMaxAmount &&
                            `Geben Sie einen Betrag zwischen ${terms.formattedMinAmount}€ und ${terms.formattedMaxAmount}€ ein.`}
                    </p>
                    <Button size="md" type="submit">
                        Berechnen
                    </Button>
                </form>
            </div>
            <div className="spinner calculator__spinner" style={{ opacity: isLoading ? '1' : '0' }} />
            <div className="calculator__finance-terms" style={{ opacity: isLoading ? '0.5' : '1' }}>
                {(terms.type === 'pala' || terms.error) && <TermsTable terms={terms} />}
            </div>
            {/* <!-- Terms --> */}
            {!terms.error &&
            terms.formattedMinAmount &&
            terms.formattedMaxAmount &&
            terms.offers &&
            terms.offers.length > 0 ? (
                (() => {
                    const minAmount = terms.formattedMinAmount.split(',')[0];
                    const maxAmount = terms.formattedMaxAmount.split(',')[0];
                    const [offer] = terms.offers;
                    const disclosure =
                        Number(offer.apr.replace(/[,.]/g, '')) === 0
                            ? `Vorbehaltlich Kreditwürdigkeitsprüfung, nur im Angebotszeitraum und nur für Transaktionen in Euro. Ab einem Bestellwert von ${minAmount} Euro bis ${maxAmount} Euro mit einem effektiven Jahreszins von ${offer.apr}% für Darlehensverträge die im Angebotszeitraum abgeschlossen werden, Laufzeit ${offer.term} Monate. Der Kreditgeber ist PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. Als Verbraucher steht Ihnen gemäß § 514 BGB bei unentgeltlichen Darlehensverträgen ab einem Finanzierungsbetrag von 200,00 € ein Widerrufsrecht zu. Anspruchsberechtigte Kunden müssen PayPal ein SEPA Lastschriftmandat erteilen sowie über ein deutsches PayPal Privat-Konto mit bestätigtem Bankkonto als Zahlungsquelle verfügen. `
                            : `Der effektive Jahreszins beträgt ${offer.apr}%, der feste Sollzinssatz ${offer.nominalRate}%. Der Kreditgeber ist die PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg. Dieses Angebot gilt nur für Transaktionen in Euro ab einem Bestellwert von ${minAmount}€ bis ${maxAmount}€ und vorbehaltlich Kreditwürdigkeitsprüfung. Die Laufzeit beträgt ${offer.term} Monate. Anspruchsberechtigte Kunden müssen PayPal ein SEPA-Lastschriftmandat erteilen sowie über ein deutsches PayPal-Privatkonto mit bestätigtem Bankkonto als Zahlungsquelle verfügen. `;

                    return (
                        <p className="content__disclosure" id="modal-disclosure">
                            {disclosure}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.paypal.com/de/webapps/mpp/paypal-instalments"
                            >
                                Mehr erfahren
                            </a>
                        </p>
                    );
                })()
            ) : (
                <p className="content__disclosure" id="modal-generic-disclosure">
                    Der Kreditgeber ist die PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449
                    Luxemburg. Dieses Angebot gilt nur für Transaktionen in Euro und vorbehaltlich
                    Kreditwürdigkeitsprüfung. Es gelten Warenkorbwertbeschränkungen. Anspruchsberechtigte Kunden müssen
                    PayPal ein SEPA-Lastschriftmandat erteilen sowie über ein deutsches PayPal-Privatkonto mit
                    bestätigtem Bankkonto als Zahlungsquelle verfügen.
                </p>
            )}
        </Fragment>
    );
};

export default Calculator;
