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
                    <input
                        className="calculator__input"
                        type="text"
                        id="number-input"
                        step="0.1"
                        placeholder="0"
                        min="0"
                        value={value}
                        onChange={changeInput}
                    />
                    <Button type="submit" secondary>
                        Calculate
                    </Button>
                    <div className="calculator__error-msg" id="error-msg">
                        Enter a valid number for purchase amount
                    </div>
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
