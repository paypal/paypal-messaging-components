/** @jsx h */
import { h } from 'preact';

import Carousel from '../../parts/Carousel';
import Calculator from '../../parts/Calculator';

const INST = () => {
    return (
        <section>
            <Carousel
                items={[
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_shoppingcart.svg',
                        imageAlt: 'Shopping cart icon',
                        description: 'Mit PayPal bezahlen und PayPal Ratenzahlung wählen.'
                    },
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_calendar.svg',
                        imageAlt: 'Calendar icon',
                        description: 'Wir teilen Ihren Betrag in 12 monatliche Raten.'
                    },
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_payovertime.svg',
                        imageAlt: 'Clock and wallet icon',
                        description: 'Nie eine Rate verpassen dank Lastschrifteinzug.'
                    }
                ]}
            />

            {/* <!-- Calculator --> */}
            <div className="content">
                <Calculator country="DE" />

                {/* <!-- Terms --> */}
                <p className="disclosure hidden" id="modal-disclosure">
                    Der effektive Jahreszins beträgt <span id="disclosure-monthly-interest" />, der feste Sollzinssatz
                    <span id="disclosure-nominal-interest" />. Der Kreditgeber ist die PayPal (Europe) S.à r.l. et Cie,
                    S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg. Dieses Angebot gilt nur für Transaktionen in Euro
                    ab einem Bestellwert von <span id="disclosure-min-amount" />€ bis{' '}
                    <span id="disclosure-max-amount" />€ und vorbehaltlich Kreditwürdigkeitsprüfung. Die Laufzeit
                    beträgt
                    <span id="disclosure-num-payments" /> Monate. Anspruchsberechtigte Kunden müssen PayPal ein
                    SEPA-Lastschriftmandat erteilen sowie über ein deutsches PayPal-Privatkonto mit bestätigtem
                    Bankkonto als Zahlungsquelle verfügen.
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/de/webapps/mpp/paypal-instalments"
                    >
                        Mehr erfahren
                    </a>
                </p>
                <p className="disclosure" id="modal-generic-disclosure">
                    Der Kreditgeber ist die PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449
                    Luxemburg. Dieses Angebot gilt nur für Transaktionen in Euro und vorbehaltlich
                    Kreditwürdigkeitsprüfung. Es gelten Warenkorbwertbeschränkungen. Anspruchsberechtigte Kunden müssen
                    PayPal ein SEPA-Lastschriftmandat erteilen sowie über ein deutsches PayPal-Privatkonto mit
                    bestätigtem Bankkonto als Zahlungsquelle verfügen.
                </p>
            </div>
        </section>
    );
};

export default INST;
