/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import {
    useCalculator,
    useServerData,
    useXProps,
    delocalize,
    getDisplayValue,
    getComputedVariables,
    currencyFormat
} from '../lib';
import TermsTable from './TermsTable';
import Icon from './Icon';

const getError = ({ offers, error = '' }, isLoading, calculator, amount, country = 'US') => {
    const {
        minAmount,
        maxAmount,
        content: {
            calculator: { belowThreshold, aboveThreshold }
        }
    } = getComputedVariables(offers);

    // Grabs the generic calculator error from offer json
    const { genericError } = calculator;

    /**
     * If there is an error with the request or we don't get a max amount back give back a generic error.
     * Generic error says something like - "Something went wrong, please try again later."
     */
    if (error || !maxAmount) {
        return genericError;
    }

    // If isLoading is true, do not return an error and instead return null. We don't return an error until debounce is complete.
    if (isLoading) {
        return null;
    }

    const replaceRegExp = {
        DE: /(,[0-9]*?)00/g,
        US: /(\.[0-9]*?)00/g
    };
    // If amount is undefined (none is passed in), return the belowThreshold error.
    if (typeof amount === 'undefined') {
        return belowThreshold.replace(replaceRegExp[country], '').replace(/(EUR)/g, '€');
    }

    // Checks amount against qualifying min and max ranges to determine which error message to show.
    if (amount < minAmount) {
        return belowThreshold.replace(replaceRegExp[country], '').replace(/(EUR)/g, '€');
    }
    if (amount > maxAmount) {
        return aboveThreshold.replace(replaceRegExp[country], '').replace(/(EUR)/g, '€');
    }

    // if we don't get back any qualifying offers, we return a generic error. - "Something went wrong, please try again later."
    if (!offers?.[0]?.meta?.qualifying === 'true') {
        return genericError;
    }

    // If none of these checks apply, don't return an error.
    return null;
};

const Calculator = ({ setExpandedState, calculator, aprDisclaimer }) => {
    const { view, value, isLoading, submit, changeInput } = useCalculator({ autoSubmit: true });
    const { amount } = useXProps();
    const { country, views } = useServerData();
    const { title, inputLabel, inputPlaceholder, inputCurrencySymbol } = calculator;

    // Set hasUsedInputField to true if someone has typed in the input field at any point.
    const [hasUsedInputField, setHasUsedInputField] = useState(false);

    // If an amount was passed in via xprops so amount is not undefined.
    const hasInitialAmount = typeof amount !== 'undefined';

    // If the person entered an amount in the calc and it is not 0.
    const hasEnteredAmount = !(parseInt(delocalize(value || '0', country), 10) === 0);

    // If no initial amount is passed in (amount is undefined) and they have not entered any amount at all (aka empty input field).
    const emptyState = !hasInitialAmount && !hasEnteredAmount;

    const [displayValue, setDisplayValue] = useState(hasInitialAmount ? value : '');

    // Pass view, isLoading state, and calculator props into getError to get the appropriate error, if any. Could return as 'null'.
    const error = getError(view, isLoading, calculator, delocalize(displayValue ?? '0', country), country);

    useEffect(() => {
        if (!hasInitialAmount && !hasUsedInputField) {
            setDisplayValue('');
        } else {
            setDisplayValue(getDisplayValue(value, country));
        }
    }, [views, value]);

    /**
     * expandedState determines if the desktop view of the PAY_LATER_LONG_TERM modal is expanded (i.e. a view with offers exists or has loading shimmer).
     * If expandedState is false, a class of "collapsed" gets added to affected elements for styling purposes.
     */
    if (hasInitialAmount || hasEnteredAmount) {
        if (view || isLoading) {
            setExpandedState(true);
        } else setExpandedState(false);
    }

    const onKeyDown = evt => {
        // Only allow special keys or appropriate number/formatting keys
        if (evt.key.length === 1 && !/[\d.,]/.test(evt.key)) {
            evt.preventDefault();
        }

        // Ctrl (or Cmd) + a select all on input field.
        const keyComboCheck = (evt.ctrlKey && evt.key === 'a') || (evt.metaKey && evt.key === 'a');

        if (keyComboCheck) {
            evt.target.select();
        }
    };

    const onInput = evt => {
        setHasUsedInputField(true);

        const { selectionStart, selectionEnd, value: targetValue } = evt.target;
        const onInputValue = delocalize(targetValue, country);
        const newDisplayValue = getDisplayValue(targetValue, country);

        const finalValue = parseFloat(Number(onInputValue).toFixed(2)) < 1000000 ? newDisplayValue : displayValue;

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
                        <div>{error}</div>
                    </div>
                </div>
            );
        }
        return null;
    };

    /**
     * Due to slight differences in the calculator input styling between
     * the US and DE versions of the universal modal, the function below
     * determines when to return the inputLabel content depending on the country.
     */
    const renderInputLabelOnEmptyField = offerCountry => {
        if (offerCountry === 'US') {
            return displayValue !== '' ? inputLabel : '';
        }
        return inputLabel;
    };

    return (
        <div className="calculator">
            <form className="form" onSubmit={submit}>
                <h4 className="title">{title}</h4>
                <div className="input__wrapper transitional">
                    <div className={`input__label ${country}`}>{renderInputLabelOnEmptyField(country)}</div>
                    {inputCurrencySymbol && <div className="input__currency-symbol">{inputCurrencySymbol}</div>}
                    <input
                        aria-required="true"
                        className={`input ${displayValue === '' && country === 'US' ? 'empty-input' : ''}`}
                        placeholder={currencyFormat(inputPlaceholder).replace(/(\s?€)/g, '')}
                        type="tel"
                        value={displayValue}
                        onInput={onInput}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div aria-live="polite">{renderError(error || emptyState || isLoading)}</div>
            </form>
            {hasInitialAmount || hasUsedInputField ? (
                <div aria-live="polite" className="content-column">
                    <TermsTable view={view} isLoading={isLoading} aprDisclaimer={aprDisclaimer} />
                </div>
            ) : null}
            {country === 'US' && (
                <div
                    className={`finance-terms__disclaimer ${
                        !(hasInitialAmount || hasUsedInputField) || error ? 'no-amount' : ''
                    }`}
                >
                    {aprDisclaimer[0].aprDisclaimer}
                </div>
            )}
        </div>
    );
};

export default Calculator;
