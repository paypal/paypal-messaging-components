/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';

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

const delocalize = value =>
    value
        // Remove any non-currency character
        .replace(/[^\d.,]/g, '')
        // Replace thousands marker
        .replace(/\./g, '')
        // Replace decimal marker
        .replace(/,/, '.');

const getDisplayValue = value => {
    const delocalizedValue = delocalize(value);
    const truncatedValue = /\d+\./.test(delocalizedValue)
        ? delocalizedValue.match(/^\d+\.\d{0,2}/)[0]
        : delocalizedValue;

    const [whole, fraction = ''] = truncatedValue.split('.');
    const formattedValue = Number(whole).toLocaleString('de-DE', {
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    // Allow display value to end with a dangling comma to allow typing a "cent" value
    return delocalizedValue === '' || formattedValue === 'NaN'
        ? ''
        : `${formattedValue}${fraction !== '' || value[value.length - 1] === ',' ? `,${fraction}` : ''}`;
};

const Calculator = () => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator({ autoSubmit: true });
    const { amount } = useXProps();

    const hasInitialAmount = typeof amount !== 'undefined';
    const hasEnteredAmount = value !== '0,00' && value !== '';
    const emptyState = !hasInitialAmount && !hasEnteredAmount;

    const [displayValue, setDisplayValue] = useState(hasInitialAmount ? value : '');
    const error = getError(terms, isLoading);

    const {
        calculator: { title, inputLabel, amountRange }
    } = useContent('GPL');

    const onInput = evt => {
        const { selectionStart, selectionEnd, value: targetValue } = evt.target;

        const delocalizedValue = delocalize(targetValue);
        const newDisplayValue = getDisplayValue(targetValue);

        const finalValue =
            targetValue.length < 10 && Number(delocalizedValue).toFixed(2).length < 9 ? newDisplayValue : displayValue;

        const selectionOffset = finalValue.length - targetValue.length;

        setDisplayValue(finalValue);
        changeInput(evt);

        submit();

        const ref = evt.target;
        requestAnimationFrame(() => {
            ref.setSelectionRange(selectionStart + selectionOffset, selectionEnd + selectionOffset);
        });
    };

    return (
        <div className="calculator">
            <form className={`form ${emptyState ? 'no-amount' : ''}`} onSubmit={submit}>
                {emptyState ? <h3 className="title">{title}</h3> : null}
                <div className="input__wrapper">
                    <div className="input__label">{inputLabel}</div>
                    {/* Not setting value from useCalculator to avoid re-formatting while user is typing */}
                    <input className="input" type="tel" value={displayValue} onInput={onInput} />
                </div>
                {error || emptyState || isLoading ? (
                    <div className="calculator__error">
                        {error ? <Icon name="warning" /> : null}
                        {error ?? amountRange.replace(/,00/g, '')}
                    </div>
                ) : null}
            </form>
            <div className="content-column">
                <TermsTable
                    terms={terms}
                    isLoading={isLoading}
                    hasError={(!hasInitialAmount && !hasEnteredAmount) || !!error}
                />
            </div>
        </div>
    );
};

export default Calculator;
