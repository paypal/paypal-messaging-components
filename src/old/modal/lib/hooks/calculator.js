import objectEntries from 'core-js-pure/stable/object/entries';
import { useContext, useReducer, useEffect } from 'preact/hooks';

import { useXProps } from './helpers';
import { ServerContext } from '../context';
import { request, memoizeOnProps } from '../../../../utils';

const termsFetcher = memoizeOnProps(
    ({ csrf, ...params }) => {
        const query = objectEntries(params)
            .reduce((acc, [key, val]) => (val ? `${acc}&${key}=${val}` : acc), '')
            .slice(1);

        return request('GET', `${window.location.origin}/credit-presentment/calculateTerms?${query}`);
    },
    ['amount', 'country', 'client_id', 'payer_id', 'merchant_id']
);

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
    const { terms: initialTerms } = useContext(ServerContext);
    const { payerId, clientId, merchantId, country, onCalculate, amount } = useXProps();
    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(country, initialTerms.amount),
        prevValue: localize(country, initialTerms.amount),
        terms: initialTerms,
        isLoading: false
    });

    const params = {
        country,
        client_id: clientId,
        payer_id: payerId,
        merchant_id: merchantId
    };

    const fetchTerms = inputAmount => {
        dispatch({ type: 'fetch' });

        termsFetcher({
            ...params,
            amount: inputAmount
        }).then(({ data }) => {
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
