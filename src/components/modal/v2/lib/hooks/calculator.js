import { useReducer, useMemo, useRef } from 'preact/hooks';
import { debounce } from '@krakenjs/belter/src';

import { useXProps, useServerData } from '../providers';
import { getOrCreateStorageID } from '../../../../../utils';
import { useDidUpdateEffect } from './helpers';
import { getContent } from '../utils';
import { localize, delocalize } from '../locale';

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
        case 'view': {
            const newInputValue = action.data.autoSubmit ? state.inputValue : action.data.formattedAmount;

            return {
                isLoading: false,
                view: action.data,
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

export default function useCalculator({ autoSubmit = false } = {}) {
    const calculateRef = useRef();
    const serverData = useServerData();
    const { views, country, setServerData } = serverData;

    // From the views retreived, find and return the view with an offers property (i.e. PAY_LATER_LONG_TERM) if there is one.
    const viewWithOffers = views.find(view => view?.offers);

    const {
        currency,
        payerId,
        clientId,
        merchantId,
        customerId,
        onCalculate,
        buyerCountry,
        ignoreCache,
        amount,
        stageTag,
        integrationType,
        channel,
        ecToken,
        devTouchpoint
    } = useXProps();

    const [state, dispatch] = useReducer(reducer, {
        inputValue: localize(amount, country, 2),
        prevValue: localize(amount, country, 2),
        view: viewWithOffers,
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
            customerId,
            buyerCountry,
            ignoreCache,
            stageTag,
            integrationType,
            channel,
            ecToken,
            devTouchpoint,
            deviceID: getOrCreateStorageID()
        })
            .then(data => {
                setServerData(data);

                // TODO: do not store terms in reducer since serverData will be kept up-to-date
                dispatch({
                    type: 'view',
                    data: {
                        ...data?.views.find(view => view?.offers),
                        autoSubmit
                    }
                });
            })
            .catch(() => {
                dispatch({
                    type: 'view',
                    data: {
                        error: true
                    }
                });
            });
    };

    // Update the offer terms in the reducer based on outside changes to serverData
    useDidUpdateEffect(() => {
        const viewWithOffersAmount =
            Number(viewWithOffers.offers.length > 0 && viewWithOffers.offers[0].meta.amount) / 100;

        // When amount xprop changes, Container.jsx will fetch new serverData (including offers)
        // If we see new offer terms, which match the amount prop, but the value in the input does not match
        // This means the amount changed outside the modal, so we update the offer terms
        // we want to update the inputValue, so force autoSubmit: false
        if (
            // Instead of comparing equality, check for a small delta difference of a cent since the amount
            // provided could be a value resulted from JavaScript math where the value has floating point
            // precision issues (e.g. 100.000000000001)
            Math.abs(viewWithOffersAmount - amount) < 0.01 &&
            Math.abs(delocalize(state.inputValue, country) - amount) >= 0.01
        ) {
            dispatch({
                type: 'view',
                data: {
                    ...viewWithOffers,
                    formattedAmount: localize(`${viewWithOffersAmount}`, country, 2),
                    autoSubmit: false
                }
            });
        }
    }, [viewWithOffers, amount]);

    // Because we use state in this function, which changes every dispatch,
    // and we want it debounced, we need to use a ref to hold the most up-to-date function reference
    calculateRef.current = () => {
        const delocalizedValue = delocalize(state.inputValue, country).replace(/\.$/, '.00');

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
                    localize(value, country, 2).length > 9 || value.length > 9
                        ? state.inputValue
                        : value
                              .replace(/[^\d.,]/g, '') // Replace non-numeric characters
                              .replace(/([.,]\d{2})\d+$/, (_, p1) => p1), // Fix decimals to 2 places
                autoSubmit
            }
        });

        if (autoSubmit) {
            debouncedCalculate();
        }
    };

    const { isLoading } = state;

    return {
        view: state.view,
        // Replace start of value string that isn't a digit (i.e. if someone tries to enter a period or a comma first) with an empty string.
        value: state.inputValue.replace(/^\D/, ''),
        isLoading,
        changeInput,
        submit
    };
}
