import { useContext, useReducer } from 'preact/hooks';

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
    const { payerId, clientId, country, onCalculate } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(country, terms.amount),
        prevValue: localize(country, terms.amount),
        terms,
        isLoading: false
    });

    // TODO: Input validation
    const changeInput = evt => {
        dispatch({ type: 'input', data: evt.target.value });
    };

    const submit = event => {
        event.preventDefault();
        const delocalizedValue = delocalize(country, state.inputValue);

        if (state.prevValue !== state.inputValue && delocalizedValue !== 'NaN') {
            dispatch({ type: 'fetch' });
            onCalculate(delocalizedValue);
            request(
                'POST',
                `${
                    window.location.origin
                }/credit-presentment/calculateTerms?amount=${delocalizedValue}&country=${country}&${
                    clientId ? `client_id=${clientId}` : `payer_id=${payerId}`
                }`,
                {
                    headers: {
                        'x-csrf-token': meta.csrf
                    }
                }
            ).then(({ data }) => {
                dispatch({ type: 'terms', data });
            });
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
