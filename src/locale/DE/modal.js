/* eslint-disable no-unused-vars */
import objectValues from 'core-js-pure/stable/object/values';
import arrayFrom from 'core-js-pure/stable/array/from';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import getTerms from '../../messages/services/terms';
import renderTermsTable from './termsTable';

export function getModalType() {
    return 'INST';
}

export default function getModalContent(options, state, trackModalEvent) {
    const type = getModalType();

    const getElements = iframe => {
        return {
            financeTermsTable: iframe.contentDocument.getElementsByTagName('main')[0]
        };
    };

    function fetchTerms(amount) {
        // const convertedAmount = +amount;
        // if (!numberIsNaN(convertedAmount)) {
        //     // eslint-disable-next-line no-param-reassign
        //     state.contentElements.amountInput.value = convertedAmount.toFixed(2);
        // }

        // state.contentElements.loader.style.setProperty('opacity', 1);
        // state.contentElements.financeTermsTable.style.setProperty('opacity', 0.4);

        return getTerms({ ...options, amount }).then(terms => {
            console.log(terms);
            // state.contentElements.loader.style.setProperty('opacity', 0);
            // state.contentElements.financeTermsTable.style.setProperty('opacity', 1);
            // eslint-disable-next-line no-param-reassign
            state.contentElements.financeTermsTable.innerHTML = renderTermsTable(terms);
        });
    }

    function isValidAmount(amount) {
        if (numberIsNaN(Number(amount))) {
            return false;
        }

        const [int = '', dec = ''] = amount.split('.');
        // Maximum value: 99999.99
        return int.length <= 5 && dec.length <= 2;
    }

    const addHandlers = () => {};

    const onLoad = () => {
        fetchTerms(options.amount);
    };

    const onClose = () => {};

    return {
        type,
        getElements,
        addHandlers,
        onLoad,
        onClose
    };
}
/* eslint-enable no-unused-vars */
