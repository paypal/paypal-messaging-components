/** @jsx h */
import { h } from 'preact';

import { useCalculator, useContent, useXProps } from '../../../lib';
import TermsTable from './TermsTable';

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();
    const { amount } = useXProps();

    const {
        calculator: { title, inputLabel, amountRange }
    } = useContent('GPL');

    const onInput = evt => {
        changeInput(evt, { autoSubmit: true });

        submit(null, { debounce: true });
    };

    const hasInitialAmount = typeof amount !== 'undefined';
    const hasEnteredAmount = value !== '0,00';
    const emptyState = !hasInitialAmount && !hasEnteredAmount;

    return (
        <div className="calculator">
            <form className={`form ${emptyState ? 'no-amount' : ''}`} onSubmit={submit}>
                {emptyState ? <h3 className="title">{title}</h3> : null}
                <div className="input-wrapper">
                    <div>{inputLabel}</div>
                    {/* Not setting value from useCalculator to avoid re-formatting while user is typing */}
                    <input
                        className="input"
                        type="tel"
                        defaultValue={hasInitialAmount ? value : ''}
                        onInput={onInput}
                    />
                </div>
                <div className="calculator__range">{amountRange.replace(/,00/g, '')}</div>
            </form>
            <div className="content-column">
                {hasInitialAmount || hasEnteredAmount ? <TermsTable terms={terms} isLoading={isLoading} /> : null}
            </div>
        </div>
    );
};

export default Calculator;
