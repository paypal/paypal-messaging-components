/** @jsx h */
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import { debounce } from 'belter/src';

import { useCalculator, useContent } from '../../../lib';
import TermsTable from './TermsTable';

const Calculator = () => {
    const submitRef = useRef(null);
    const { terms, value, isLoading, submit, changeInput } = useCalculator();

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
        changeInput(evt);

        debouncedSubmit();
    };

    return (
        <div className="calculator">
            <div className="calculator__header">
                <h2 className="title">{title}</h2>
                <div className="calculator__input">
                    <div>{inputLabel}</div>
                    <input className="input" value={value} onInput={onInput} />
                </div>
                <div className="calculator__range">{amountRange.replace(/,00/g, '')}</div>
            </div>
            <div className="content-column">
                <TermsTable terms={terms} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Calculator;
