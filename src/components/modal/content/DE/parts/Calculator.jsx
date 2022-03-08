/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator, useContent } from '../../../lib';
import Button from '../../../parts/Button';
import TermsTable from './TermsTable';
import Disclaimer from './Disclaimer';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();
    const {
        calculator: { title, instructions, disclosure }
    } = useContent('PAYPAL_CREDIT_INSTALLMENTS');

    const { error, formattedMinAmount, formattedMaxAmount, offers } = terms;

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="title">{title}</h3>
                <form className={`form ${isLoading ? 'form--loading' : ''}`} onSubmit={submit}>
                    <input className="input" value={value} onInput={changeInput} />
                    <p className="instructions">
                        {!error && formattedMinAmount && formattedMaxAmount ? instructions.replace(/,00/g, '') : null}
                    </p>
                    <Button size="md" type="submit">
                        Berechnen
                    </Button>
                </form>
            </div>
            <TermsTable terms={terms} isLoading={isLoading} />
            {!error && offers && offers.length > 0 && offers[0].qualified && <p className="disclosure">{disclosure}</p>}
            <Disclaimer terms={terms} />
        </Fragment>
    );
};

export default Calculator;
