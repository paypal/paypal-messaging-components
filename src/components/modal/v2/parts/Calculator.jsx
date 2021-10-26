/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useCalculator, useServerData, useXProps } from '../lib';
import TermsTable from './TermsTable';
import Icon from './Icon';

/**
 *
 * @param {*} offers Offers returned from the server.
 * @returns Computed minAmount, maxAmount, belowThreshold, and aboveThreshold values.
 *
 * This function takes in the offers returned from the server and loops over each offer
 * in order to find the absolute min and max amounts from the offers.
 * From the offer with the lowest min amount, the belowThreshold error content is retrieved.
 * Similarly with the offer with the highest max amount, the aboveThreshold error content is retrieved.
 */
const getComputedVariables = offers =>
    offers.reduce(
        (acc, { meta, content }) => {
            if (meta.minAmount) {
                acc.minAmount = acc.minAmount
                    ? Math.min(acc.minAmount, Number(meta.minAmount))
                    : Number(meta.minAmount);

                if (acc.minAmount === Number(meta.minAmount)) {
                    acc.content.calculator.belowThreshold = content.calculator.belowThreshold;
                }
            }

            if (meta.maxAmount) {
                acc.maxAmount = acc.maxAmount
                    ? Math.max(acc.maxAmount, Number(meta.maxAmount))
                    : Number(meta.maxAmount);

                if (acc.maxAmount === Number(meta.maxAmount)) {
                    acc.content.calculator.aboveThreshold = content.calculator.aboveThreshold;
                }
            }

            return acc;
        },
        {
            content: {
                calculator: {}
            }
        }
    );

const getError = ({ offers, error = '' }, isLoading, calculator, amount) => {
    const {
        minAmount,
        maxAmount,
        content: {
            calculator: { belowThreshold, aboveThreshold }
        }
    } = getComputedVariables(offers);

    // Grabs the various calculator errors from offer json
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

    // If amount is undefined (none is passed in), return the belowThreshold error.
    if (typeof amount === 'undefined') {
        return belowThreshold.replace(/(\.[0-9]*?)00/g, ' ');
    }

    // Checks amount against qualifying min and max ranges to determine which error message to show.
    if (amount < minAmount) {
        return belowThreshold.replace(/(\.[0-9]*?)00/g, ' ');
    }
    if (amount > maxAmount) {
        return aboveThreshold.replace(/(\.[0-9]*?)00/g, '');
    }

    // if we don't get back any qualifying offers, we return a generic error. - "Something went wrong, please try again later."
    if (!offers?.[0]?.meta?.qualifying === 'true') {
        return genericError;
    }

    // If none of these checks apply, don't return an error.
    return null;
};

const delocalize = (value, country) => {
    switch (country) {
        case 'DE':
            return (
                value
                    // Remove any non-currency character
                    .replace(/[^\d,]/g, '')
                    // Replace decimal marker
                    .replace(/,/, '.')
            );
        default:
            return value.replace(/[^\d.]/g, '');
    }
};

const getDisplayValue = (value, country) => {
    const delocalizedValue = delocalize(value, country);

    // Match all digits before the decimal and 1-2 digits after
    // eslint-disable-next-line security/detect-unsafe-regex
    const [, whole, fraction = ''] = delocalizedValue.match(/^(\d+)(?:\.(\d{1,2}))?/) ?? [];
    let formattedValue;
    let displayStr;

    /**
     * Determines displayed string formatting in input field based on country.
     * Allow displayStr value to end with a dangling period decimal or comma to allow typing a "cent" value.
     */
    switch (country) {
        case 'DE':
            formattedValue = Number(whole).toLocaleString('de-DE', {
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
            displayStr = `${formattedValue}${
                fraction !== '' || value[value.length - 1] === ',' ? `,${fraction.slice(0, 2)}` : ''
            }`;
            break;
        default:
            formattedValue = Number(whole).toLocaleString('en-US', {
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
            displayStr = `$${formattedValue}${
                fraction !== '' || value[value.length - 1] === '.' ? `.${fraction.slice(0, 2)}` : ''
            }`;
            break;
    }

    // Return empty string if delocalizedValue is an empty string or if formattedValue is 'NaN'. Otherwise return displayStr.
    return delocalizedValue === '' || formattedValue === 'NaN' ? '' : displayStr;
};

const Calculator = ({ setExpandedState, calculator, disclaimer }) => {
    const { terms, value, isLoading, submit, changeInput } = useCalculator({ autoSubmit: true });
    const { amount } = useXProps();
    const { country } = useServerData();

    // If an amount was passed in via xprops so amount is not undefined.
    const hasInitialAmount = typeof amount !== 'undefined';
    // If the person entered an amount in the calc and it's not 0,00, 0.00, or 0.

    const hasEnteredAmount = value !== '0,00' && value !== '0.00' && value !== '0';
    // If no initial amount is passed in (amount is undefined) and they have not entered any amount at all (aka empty input field).
    const emptyState = !hasInitialAmount && !hasEnteredAmount;

    const [displayValue, setDisplayValue] = useState(hasInitialAmount ? value : '');
    // Pass terms, isLoading state, and calculator props into getError to get the appropriate error, if any. Could return as 'null'.
    const error = getError(terms, isLoading, calculator, delocalize(displayValue ?? '0'));

    const { title, inputLabel, inputPlaceholder } = calculator;

    // Update display value based on changes from useCalculator
    useEffect(() => {
        if (!hasInitialAmount && !hasEnteredAmount) {
            setDisplayValue('');
        } else setDisplayValue(getDisplayValue(value, country));
    }, [value]);

    /**
     * expandedState determines if the desktop view of the Pay Monthly modal is expanded (i.e. has terms or has loading shimmer).
     * If expandedState is false, a class of "collapsed" gets added to affected elements for styling purposes.
     */
    if (hasInitialAmount || hasEnteredAmount) {
        if (terms || isLoading) {
            setExpandedState(true);
        } else setExpandedState(false);
    }

    const onKeyDown = evt => {
        // Only allow special keys or appropriate number/formatting keys
        if (evt.key.length === 1 && !/[\d.,]/.test(evt.key)) {
            evt.preventDefault();
        }

        let keyComboCheck;

        /**
         * Ctrl (or Cmd) + a select all on input field.
         * Checks if browser is IE11 or not and uses appropriate key selection method.
         * event.keyCode is depricated and not recommended for newer browsers, however, it
         * is supported for IE11. Newer browsers should use the event.key and event.code methods.
         * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
         */
        if (!!window.MSInputMethodContext && !!document.documentMode) {
            keyComboCheck = evt.ctrlKey && evt.keyCode === 65;
        } else {
            keyComboCheck = (evt.ctrlKey && evt.key === 'a') || (evt.metaKey && evt.key === 'a');
        }

        if (keyComboCheck) {
            evt.target.select();
        }
    };

    const onInput = evt => {
        const { selectionStart, selectionEnd, value: targetValue } = evt.target;

        const delocalizedValue = delocalize(targetValue);
        const newDisplayValue = getDisplayValue(targetValue, country);

        const finalValue = parseFloat(Number(delocalizedValue).toFixed(2)) < 1000000 ? newDisplayValue : displayValue;

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
                        <span>{error}</span>
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
                        value={parseFloat(delocalize(displayValue ?? '0')) === 0 ? '' : displayValue}
                        onInput={onInput}
                        onKeyDown={onKeyDown}
                    />
                </div>
                {renderError(error || emptyState || isLoading)}
            </form>
            {hasEnteredAmount ? (
                <div className="content-column">
                    <TermsTable terms={terms} isLoading={isLoading} hasError={error} />
                </div>
            ) : (
                <Fragment />
            )}
            <div className={`finance-terms__disclaimer ${emptyState ? 'no-amount' : ''}`}>{disclaimer}</div>
        </div>
    );
};

export default Calculator;
