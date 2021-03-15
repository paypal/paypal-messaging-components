/** @jsx h */
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import { debounce } from 'belter/src';

import { useCalculator, useContent, useXProps } from '../../../lib';
import TermsTable from './TermsTable';

const Calculator = () => {
    const submitRef = useRef(null);
    const { terms, value, isLoading, submit, changeInput } = useCalculator();
    const { amount } = useXProps();

    // Keep a ref for the function so debounce can access the most recent one
    submitRef.current = submit;

    // useMemo allows the debounce method to always be the same reference so the debounce can be maintained
    const debouncedSubmit = useMemo(
        () =>
            debounce(() => {
                submitRef.current();
            }, 1000),
        []
    );

    const {
        calculator: { title, inputLabel, amountRange }
    } = useContent('GPL');

    const onInput = evt => {
        changeInput(evt, { autoSubmit: true });

        debouncedSubmit();
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
                    <input className="input" defaultValue={hasInitialAmount ? value : ''} onInput={onInput} />
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
