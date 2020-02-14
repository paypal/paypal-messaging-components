/** @jsx h */
import { h, Fragment } from 'preact';

import { useCalculator } from '../../../lib/hooks';
import TermsTable from './TermsTable';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

    return (
        <Fragment>
            <div className="calculator">
                <h3 className="calculator__title">Enter a purchase amount to calculate your monthly Easy Payments.</h3>
                <form className="calculator__form" onSubmit={submit}>
                    <input className="calculator__input" type="text" value={value} onInput={changeInput} />
                    <button className="calculator__btn" type="submit" id="calculate-ezp">
                        Calculate
                    </button>
                    <div className="calculator__error-msg" id="error-msg">
                        Enter a valid number for purchase amount
                    </div>
                </form>
            </div>

            <section id="financing-terms">
                <div id="loading-image" style={{ opacity: isLoading ? '1' : '0' }} />
                <div style={{ opacity: isLoading ? '0.5' : '1' }}>
                    <TermsTable terms={terms} />
                </div>
            </section>
        </Fragment>
    );
};

export default Calculator;
