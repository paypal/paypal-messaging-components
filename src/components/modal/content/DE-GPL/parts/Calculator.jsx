/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useCalculator, useContent, useXProps } from '../../../lib';
import TermsTable from './TermsTable';
import Icon from '../../../parts/Icon';

const getError = ({ amount, minAmount, maxAmount, error, offers }, isLoading) => {
    const {
        calculator: { genericError, amountRange }
    } = useContent('GPL');

    if (error || !maxAmount) {
        return genericError;
    }

    if (typeof amount === 'undefined' || isLoading) {
        return null;
    }

    if (+amount < minAmount || +amount > maxAmount) {
        return amountRange.replace(/(\.|,)00(.|\s*)EUR/g, '€');
    }

    if (!offers?.[0]?.qualified) {
        return genericError;
    }

    return null;
};

const delocalize = value =>
    value
        // Remove any non-currency character
        .replace(/[^\d,]/g, '')
        // Replace decimal marker
        .replace(/,/, '.');

const getDisplayValue = value => {
    const delocalizedValue = delocalize(value);

    // match all digits before the decimal and 1-2 digits after
    // eslint-disable-next-line security/detect-unsafe-regex
    const [, whole, fraction = ''] = delocalizedValue.match(/^(\d+)(?:\.(\d{1,2}))?/) ?? [];
    const formattedValue = Number(whole).toLocaleString('de-DE', {
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    // Allow display value to end with a dangling comma to allow typing a "cent" value
    return delocalizedValue === '' || formattedValue === 'NaN'
        ? ''
        : `${formattedValue}${fraction !== '' || value[value.length - 1] === ',' ? `,${fraction.slice(0, 2)}` : ''}`;
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

    // Update display value based on changes from useCalculator
    useEffect(() => {
        setDisplayValue(getDisplayValue(value));
    }, [value]);

    const onKeyDown = evt => {
        // Only allow special keys or appropriate number/formatting keys
        if (evt.key.length === 1 && !/[\d.,]/.test(evt.key)) {
            evt.preventDefault();
        }
    };

    const onInput = evt => {
        const { selectionStart, selectionEnd, value: targetValue } = evt.target;

        const delocalizedValue = delocalize(targetValue);
        const newDisplayValue = getDisplayValue(targetValue);

        const finalValue =
            targetValue.length < 10 && Number(delocalizedValue).toFixed(2).length < 9 ? newDisplayValue : displayValue;

        const selectionOffset = finalValue.length - targetValue.length;

        setDisplayValue(finalValue);
        changeInput(evt);

        // If we set the selection range in the event handler, the cursor will get reset to the end of the field
        const ref = evt.target;
        requestAnimationFrame(() => {
            // Update the position of the cursor to account for newly added characters from formatting
            ref.setSelectionRange(selectionStart + selectionOffset, selectionEnd + selectionOffset);
        });
    };

    return (
        <div className="calculator">
            <form className={`form ${emptyState ? 'no-amount' : ''}`} onSubmit={submit}>
                {emptyState ? <h3 className="title">{title}</h3> : null}
                <div className="input__wrapper transitional">
                    <div className="input__label">{inputLabel}</div>
                    <input
                        aria-required="true"
                        className="input"
                        type="text"
                        value={displayValue}
                        onInput={onInput}
                        onKeyDown={onKeyDown}
                        inputmode="tel"
                    />
                </div>
                <div
                    className={`content-column transitional calculator__error ${
                        !(error || emptyState || isLoading) ? 'hide' : ''
                    }`}
                >
                    <div>
                        {error ? <Icon name="warning" /> : null}
                        <span>{error ?? amountRange.replace(/(\.|,)00(.|\s*)EUR/g, '€')}</span>
                    </div>
                </div>
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
