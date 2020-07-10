/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib';
import Button from '../../Button';
import TermsTable from './TermsTable';
import Disclaimer from './Disclaimer';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="calculator__title">Monatliche Raten berechnen</h3>
                <form className={`calculator__form ${isLoading ? 'calculator__form--loading' : ''}`} onSubmit={submit}>
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
            <div className="calculator__finance-terms">
                <div className="spinner calculator__spinner" style={{ opacity: isLoading ? '1' : '0' }} />
                <div style={{ opacity: isLoading ? '0.5' : '1' }}>
                    {(terms.type === 'pala' || terms.error) && <TermsTable terms={terms} />}
                </div>
            </div>
            {!terms.error && terms.offers && terms.offers.length > 0 && terms.offers[0].qualified && (
                <p className="content__disclosure">
                    Dies ist eine Beispielrechnung und kann vom tatsächlichen endgültigen Betrag abweichen.
                </p>
            )}
            <Disclaimer terms={terms} />
        </Fragment>
    );
};

export default Calculator;
