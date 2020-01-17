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
        </Fragment>
    );
};

export default Calculator;
