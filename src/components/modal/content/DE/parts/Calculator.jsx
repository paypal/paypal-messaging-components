/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator, useContent } from '../../../lib';
import Button from '../../../parts/Button';
import TermsTable from './TermsTable';
import Disclaimer from './Disclaimer';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();
    const { content } = useContent('INST');

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="title">{content.calculator.title}</h3>
                <form className={`form ${isLoading ? 'form--loading' : ''}`} onSubmit={submit}>
                    <input className="input" value={value} onInput={changeInput} />
                    <p className="instructions">
                        {!terms.error && terms.formattedMinAmount && terms.formattedMaxAmount
                            ? content.calculator.instructions.replace(/,00/g, '')
                            : null}
                    </p>
                    <Button size="md" type="submit">
                        Berechnen
                    </Button>
                </form>
            </div>
            <TermsTable terms={terms} isLoading={isLoading} />
            {!terms.error && terms.offers && terms.offers.length > 0 && terms.offers[0].qualified && (
                <p className="disclosure">{content.calculator.disclosure}</p>
            )}
            <Disclaimer terms={terms} />
        </Fragment>
    );
};

export default Calculator;
