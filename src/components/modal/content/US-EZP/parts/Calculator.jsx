/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib';
import TermsTable from './TermsTable';
import Button from '../../../parts/Button';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h2 className="title">Enter a purchase amount to calculate your monthly Easy Payments.</h2>
                <form className={`form ${isLoading ? 'form--loading' : ''}`} onSubmit={submit}>
                    <input className="input" type="text" value={value} onInput={changeInput} />
                    <Button className="button" type="submit" secondary>
                        Calculate
                    </Button>
                </form>
            </div>

            <TermsTable terms={terms} isLoading={isLoading} />
        </Fragment>
    );
};

export default Calculator;
