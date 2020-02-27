/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib/hooks';
import TermsTable from './TermsTable';
import Button from '../../Button';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h2 className="calculator__title">Enter a purchase amount to calculate your monthly Easy Payments.</h2>
                <form className="calculator__form" onSubmit={submit}>
                    <input className="calculator__input" type="text" value={value} onInput={changeInput} />
                    <Button className="calculator__button" type="submit" secondary>
                        Calculate
                    </Button>
                </form>
            </div>

            <section className="calculator__finance-terms">
                <div className="spinner" style={{ opacity: isLoading ? '1' : '0' }} />
                <div style={{ opacity: isLoading ? '0.5' : '1' }}>
                    <TermsTable terms={terms} />
                </div>
            </section>
        </Fragment>
    );
};

export default Calculator;
