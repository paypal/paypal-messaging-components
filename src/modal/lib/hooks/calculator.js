import objectEntries from 'core-js-pure/stable/object/entries';
import { useContext, useReducer, useEffect } from 'preact/hooks';

import { useXProps } from './helpers';
import { ServerContext } from '../context';
import { request } from '../../../utils';

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
    const { terms, meta } = useContext(ServerContext);
    const { payerId, clientId, merchantId, country, onCalculate, amount } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: terms ? localize(country, terms.amount) : '',
        prevValue: terms ? localize(country, terms.amount) : '',
        terms,
        isLoading: false
    });

    const fetchTerms = inputAmount => {
        dispatch({ type: 'fetch' });

        const params = {
            amount: inputAmount,
            country,
            client_id: clientId,
            payer_id: payerId,
            merchant_id: merchantId
        };

        const query = objectEntries(params)
            .reduce((acc, [key, val]) => (val ? `${acc}&${key}=${val}` : acc), '')
            .slice(1);

        request('POST', `${window.location.origin}/credit-presentment/calculateTerms?${query}`, {
            headers: {
                'x-csrf-token': meta.csrf
            }
        }).then(({ data }) => {
            dispatch({ type: 'terms', data });
        });
    };

    // Automatically fetch terms when props change
    useEffect(() => {
        if (amount) {
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
            onCalculate(delocalizedValue);
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
