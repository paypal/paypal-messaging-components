/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useCalculator, useXProps } from '../lib';
import TermsTable from './TermsTable';
import Icon from './Icon';

const getError = ({ amount, minAmount, maxAmount, error, offers }, isLoading, calculator) => {
    // grabs the various calculator errors from offer json
    const { genericError, minAmountRangeErr, maxAmountRangeErr } = calculator;

    // there is an error with the request or we don't get a max amount back give back a generic error
    // generic error says something like - something went wrong, please try again later.
    if (error || !maxAmount) {
        return genericError;
    }

    // if amount is undefined (none is passed in) or isLoading is true, return null. we don't return an error until debounce is complete.
    if (typeof amount === 'undefined' || isLoading) {
        return null;
    }

    // checks amount against min and max amount ranges to determine which error message to show
    if (+amount < minAmount) {
        return minAmountRangeErr.replace(/(\.|,)00(.|\s*)EUR/g, '€');
    }
    if (+amount > maxAmount) {
        return maxAmountRangeErr.replace(/(\.|,)00(.|\s*)EUR/g, '€');
    }

    // if we don't get back any qualifying offers, we return a generic error. - something went wrong, please try again later.
    if (!offers?.[0]?.qualified) {
        return genericError;
    }

    // if none of these checks apply. don't return an error.
    return null;
};

// TODO: probably won't need this anymore with CPNW changes.
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

const Calculator = ({ setExpandedState, calculator, termsLabel, disclaimer }) => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator({ autoSubmit: true });
    const { amount } = useXProps();

    // if an amount was passed in so amount is not undefined.
    const hasInitialAmount = typeof amount !== 'undefined';
    // if the person entered an amount in the calc and it's not 0,00 or an empty string
    const hasEnteredAmount = value !== '0,00' && value !== '';
    // if no initial amount is passed in (amount is undefined) and they have not entered any amount at all. aka empty input field
    const emptyState = !hasInitialAmount && !hasEnteredAmount;

    const [displayValue, setDisplayValue] = useState(hasInitialAmount ? value : '');
    // pass terms and isLoadings tate into getError to get the appropriate error, if any. could come back as 'null'.
    const error = getError(terms, isLoading, calculator);

    const { title, inputLabel, inputPlaceholder, amountRange } = calculator;

    // Update display value based on changes from useCalculator
    useEffect(() => {
        setDisplayValue(getDisplayValue(value));
    }, [value]);

    /**
     * expandedState determines if the desktop view of the Pay Monthly modal is expanded (i.e. has terms or has loading shimmer)
     * or not (due to error or empty input field). If expandedState is false, a class of "collapsed" gets added to affected elements
     * for styling purposes.
     */
    if (value !== '' && !!(terms || isLoading) && !(error || emptyState)) {
        setExpandedState(true);
    } else setExpandedState(false);

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

    const renderError = showErr => {
        if (showErr) {
            return (
                <div
                    className={`content-column transitional calculator__error ${
                        !(error || emptyState || isLoading) ? 'hide' : ''
                    }`}
                >
                    <div>
                        {error ? <Icon name="warning" /> : null}
                        <span>{error ?? amountRange}</span>
                    </div>
                </div>
            );
        }
        return <Fragment />;
    };

    return (
        <div className="calculator">
            <form className={`form ${emptyState ? 'no-amount' : ''}`} onSubmit={submit}>
                <h3 className="title">{title}</h3>
                <div className="input__wrapper transitional">
                    <div className="input__label">{value !== '' ? inputLabel : ''}</div>
                    <input
                        className={`input ${value === '' ? 'empty-input' : ''}`}
                        placeholder={inputPlaceholder}
                        type="tel"
                        value={displayValue}
                        onInput={onInput}
                        onKeyDown={onKeyDown}
                    />
                </div>
                {renderError(error || emptyState || isLoading)}
            </form>
            <div className="content-column">
                <TermsTable
                    terms={terms}
                    termsLabel={termsLabel}
                    disclaimer={disclaimer}
                    isLoading={isLoading}
                    hasError={(!hasInitialAmount && !hasEnteredAmount) || !!error}
                />
            </div>
        </div>
    );
};

export default Calculator;
