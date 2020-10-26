import { useReducer, useEffect } from 'preact/hooks';

import { useXProps, useServerData } from '../../../lib';
import { getContent } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'input':
            return {
                ...state,
                inputValue: action.data
            };
        case 'fetch':
            return {
                ...state,
                isLoading: true,
                prevValue: state.inputValue
            };
        case 'terms':
            return {
                isLoading: false,
                terms: action.data,
                inputValue: action.data.formattedAmount,
                prevValue: action.data.formattedAmount
            };
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

export default function useCalculator() {
    const { terms: initialTerms, country, setServerData } = useServerData();
    const { currency, payerId, clientId, merchantId, onCalculate, amount, buyerCountry } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(country, initialTerms.amount),
        prevValue: localize(country, initialTerms.amount),
        terms: initialTerms,
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
            buyerCountry
        }).then(data => {
            setServerData(data);

            // TODO: do not store terms in reducer since serverData will be kept up-to-date
            dispatch({ type: 'terms', data });
        });
    };

    // Automatically fetch terms when props change
    useEffect(() => {
        if (localize(country, amount) !== state.inputValue) {
            fetchTerms(amount);
        }
    }, [payerId, clientId, merchantId, country, amount]);

    // TODO: Stronger input validation
    const changeInput = evt => {
        dispatch({ type: 'input', data: evt.target.value.replace(/[^\d.,]/g, '') });
    };

    const submit = event => {
        event.preventDefault();
        const delocalizedValue = delocalize(country, state.inputValue);

        if (state.prevValue !== state.inputValue && delocalizedValue !== 'NaN') {
            onCalculate({ value: delocalizedValue });
            fetchTerms(delocalizedValue);
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
