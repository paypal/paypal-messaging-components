/** @jsx h */
import { h } from 'preact';

import { useCalculator, useContent, useXProps } from '../../../lib';
import TermsTable from './TermsTable';
import Icon from '../../../parts/Icon';

const getError = ({ amount, minAmount, maxAmount, error, offers }, isLoading) => {
    const {
        calculator: { genericError, amountRange }
    } = useContent('GPL');

    if (typeof amount === 'undefined' || isLoading) {
        return null;
    }

    if (error || !maxAmount) {
        return genericError;
    }

    if (+amount < minAmount || +amount > maxAmount) {
        return amountRange.replace(/,00/g, '');
    }

    const [offer] = offers.length ? offers : [];
    if (!offer || !offer.qualified) {
        return genericError;
    }

    return null;
};

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator();
    const { amount } = useXProps();
    const error = getError(terms, isLoading);

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
                <div className="input__wrapper">
                    <div className="input__label">{inputLabel}</div>
                    {/* Not setting value from useCalculator to avoid re-formatting while user is typing */}
                    <input
                        className="input"
                        type="tel"
                        defaultValue={hasInitialAmount ? value : ''}
                        onInput={onInput}
                    />
                </div>
                {error || emptyState || isLoading ? (
                    <div className="calculator__error">
                        {error ? <Icon name="warning" /> : null}
                        {error ?? amountRange.replace(/,00/g, '')}
                    </div>
                ) : null}
            </form>
            <div className="content-column">
                {(hasInitialAmount || hasEnteredAmount) && !error ? (
                    <TermsTable terms={terms} isLoading={isLoading} />
                ) : null}
            </div>
        </div>
    );
};

export default Calculator;
