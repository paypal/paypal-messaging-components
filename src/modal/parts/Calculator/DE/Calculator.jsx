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
                    <input className="calculator__input" value={value} onChange={changeInput} />
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
            {!terms.error && terms.formattedMinAmount && terms.formattedMaxAmount ? (
                <p className="content__disclosure" id="modal-disclosure">
                    Der effektive Jahreszins beträgt {terms.offers[0].apr}%, der feste Sollzinssatz{' '}
                    {terms.offers[0].nominalRate}%. Der Kreditgeber ist die PayPal (Europe) S.à r.l. et Cie, S.C.A.,
                    22-24 Boulevard Royal, L-2449 Luxemburg. Dieses Angebot gilt nur für Transaktionen in Euro ab einem
                    Bestellwert von {terms.formattedMinAmount}€ bis {terms.formattedMaxAmount}€ und vorbehaltlich
                    Kreditwürdigkeitsprüfung. Die Laufzeit beträgt {terms.offers[0].term} Monate. Anspruchsberechtigte
                    Kunden müssen PayPal ein SEPA-Lastschriftmandat erteilen sowie über ein deutsches PayPal-Privatkonto
                    mit bestätigtem Bankkonto als Zahlungsquelle verfügen.{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/de/webapps/mpp/paypal-instalments"
                    >
                        Mehr erfahren
                    </a>
                </p>
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
