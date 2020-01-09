/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib/hooks';
import TermsTable from './TermsTable';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="calculator__title">Monatliche Raten berechnen</h3>
                <form className="calculator__form" onSubmit={submit}>
                    <input id="amount-input" className="calculator__input" value={value} onChange={changeInput} />
                    <p id="calculator-instructions" className="calculator__instructions">
                        {!terms.error &&
                            terms.formattedMinAmount &&
                            terms.formattedMaxAmount &&
                            `Geben Sie einen Betrag zwischen ${terms.formattedMinAmount}€ und ${terms.formattedMaxAmount}€ ein.`}
                    </p>
                    <button type="submit" className="calculator__btn" id="calculate-button">
                        Berechnen
                    </button>
                </form>
            </div>
            <div id="loading-image" className="terms__loading" style={{ opacity: isLoading ? '1' : '0' }} />
            <div id="terms-table" className="terms" style={{ opacity: isLoading ? '0.5' : '1' }}>
                {(terms.type === 'pala' || terms.error) && <TermsTable terms={terms} />}
            </div>
        </Fragment>
    );
};

export default Calculator;
