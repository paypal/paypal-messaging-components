/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib';
import Button from '../../../parts/Button';
import TermsTable from './TermsTable';
import Disclaimer from './Disclaimer';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="title">Monatliche Raten berechnen</h3>
                <form className={`form ${isLoading ? 'form--loading' : ''}`} onSubmit={submit}>
                    <input className="input" value={value} onInput={changeInput} />
                    <p className="instructions">
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
            <TermsTable terms={terms} isLoading={isLoading} />
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
