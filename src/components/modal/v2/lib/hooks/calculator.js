import { useReducer, useMemo, useRef } from 'preact/hooks';
import { debounce } from 'belter/src';

import { useXProps, useServerData } from '../providers';
import { useDidUpdateEffect } from './helpers';
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

export const delocalize = (country, amount) => {
    return Number(country === 'DE' ? amount.replace(/\./, '').replace(/,/, '.') : amount.replace(/,/g, '')).toFixed(2);
};

export const localize = (country, amount) => {
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
    const { views, country, setServerData } = useServerData();
    const initialViewOfferTerms = views[0];
    const {
        currency,
        payerId,
        clientId,
        merchantId,
        onCalculate,
        buyerCountry,
        ignoreCache,
        amount,
        stageTag
    } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(country, amount),
        prevValue: localize(country, amount),
        terms: initialViewOfferTerms,
        isLoading: false
    });

    const fetchTerms = inputAmount => {
        dispatch({ type: 'fetch' });

        getContent({
            currency,
            amount: inputAmount,
            payerId,
            clientId,
            merchantId,
            buyerCountry,
            ignoreCache,
            stageTag
        })
            .then(data => {
                setServerData(data);

                // TODO: do not store terms in reducer since serverData will be kept up-to-date
                dispatch({
                    type: 'terms',
                    data: {
                        ...data.views[0],
                        autoSubmit
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

    // Update the offer terms in the reducer based on outside changes to serverData
    useDidUpdateEffect(() => {
        // When amount xprop changes, Container.jsx will fetch new serverData (including offers)
        // If we see new offer terms, which match the amount prop, but the value in the input does not match
        // This means the amount changed outside the modal, so we update the offer terms
        // we want to update the inputValue, so force autoSubmit: false
        if (Number(initialViewOfferTerms.amount) === amount && delocalize(country, state.inputValue) !== amount) {
            dispatch({
                type: 'terms',
                data: {
                    ...initialViewOfferTerms,
                    autoSubmit: false
                }
            });
        }
    }, [initialViewOfferTerms, amount]);

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

    let { isLoading } = state;

    if (state.inputValue === '0') {
        isLoading = false;
    }

    return {
        terms: state.terms,
        value: state.inputValue,
        isLoading,
        changeInput,
        submit
    };
}
