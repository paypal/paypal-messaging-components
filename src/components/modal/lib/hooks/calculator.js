import { useReducer, useEffect, useMemo, useRef } from 'preact/hooks';
import { debounce } from 'belter/src';

import { useXProps, useServerData } from '../../../lib';
import { getContent } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'input':
            return {
                ...state,
                isLoading: action.data.autoSubmit ? true : state.isLoading,
                inputValue: action.data.value
            };
        case 'fetch':
            return {
                ...state,
                isLoading: true,
                prevValue: state.inputValue
            };
        case 'terms': {
            const newInputValue = action.data.autoSubmit ? state.inputValue : action.data.formattedAmount;

            return {
                isLoading: false,
                terms: action.data,
                inputValue: newInputValue,
                prevValue: newInputValue
            };
        }
        case 'loaded': {
            return {
                ...state,
                isLoading: false
            };
        }

        default:
            throw new Error('Invalid action type');
    }
};

const delocalize = (country, amount) =>
    Number(country === 'DE' ? amount.replace(/\./, '').replace(/,/, '.') : amount.replace(/,/g, '')).toFixed(2);
const localize = (country, amount) => {
    const number = Number(amount) || Number(0);
    if (country === 'DE') {
        return number.toLocaleString('de-DE', {
            currency: 'EUR',
            minimumFractionDigits: 2
        });
    }

    return number.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: 2
    });
};

export default function useCalculator({ autoSubmit = false } = {}) {
    const calculateRef = useRef();
    const { terms: initialTerms, country, setServerData } = useServerData();
    const { currency, payerId, clientId, merchantId, onCalculate, amount, buyerCountry } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(country, initialTerms.amount),
        prevValue: localize(country, initialTerms.amount),
        terms: initialTerms,
        isLoading: false
    });

    const fetchTerms = (inputAmount, auto = autoSubmit) => {
        dispatch({ type: 'fetch' });

        getContent({
            currency,
            amount: inputAmount,
            payerId,
            clientId,
            merchantId,
            buyerCountry
        })
            .then(data => {
                setServerData(data);

                // TODO: do not store terms in reducer since serverData will be kept up-to-date
                dispatch({
                    type: 'terms',
                    data: {
                        ...data.terms,
                        autoSubmit: auto
                    }
                });
            })
            .catch(() => {
                dispatch({
                    type: 'terms',
                    data: {
                        error: true
                    }
                });
            });
    };

    // Automatically fetch terms when props change
    useEffect(() => {
        if (localize(country, amount) !== state.inputValue) {
            fetchTerms(amount, false);
        }
    }, [payerId, clientId, merchantId, country, amount]);

    // Because we use state in this function, which changes every dispatch,
    // and we want it debounced, we need to use a ref to hold the most up-to-date function reference
    calculateRef.current = () => {
        const delocalizedValue = delocalize(country, state.inputValue);

        if (state.prevValue !== state.inputValue && delocalizedValue !== 'NaN') {
            onCalculate({ value: delocalizedValue });
            fetchTerms(delocalizedValue, autoSubmit);
        } else {
            // The input value may have changed, but the actual amount value did not
            // ex: $10.9 === $10.90
            // In this case, just reset the loading state
            dispatch({
                type: 'loaded'
            });
        }
    };

    const submit = event => {
        if (event) {
            event.preventDefault();
        }

        calculateRef.current();
    };

    // useMemo allows the debounce method to always be the same reference so the debounce can be maintained
    const debouncedCalculate = useMemo(
        () =>
            debounce(() => {
                calculateRef.current();
            }, 1000),
        []
    );

    // TODO: Stronger input validation
    const changeInput = evt => {
        const { value } = evt.target;

        dispatch({
            type: 'input',
            data: {
                value:
                    localize(country, value).length > 9 || value.length > 9
                        ? state.inputValue
                        : value.replace(/[^\d.,]/g, ''),
                autoSubmit
            }
        });

        if (autoSubmit) {
            debouncedCalculate();
        }
    };

    return {
        terms: state.terms,
        value: state.inputValue,
        isLoading: state.isLoading,
        changeInput,
        submit
    };
}
