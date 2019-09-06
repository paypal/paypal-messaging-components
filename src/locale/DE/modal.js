/* eslint-disable no-unused-vars */
import objectValues from 'core-js-pure/stable/object/values';
import arrayFrom from 'core-js-pure/stable/array/from';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import getTerms from '../../messages/services/terms';

export function getModalType() {
    return 'INST';
}

export default function getModalContent(options, state, trackModalEvent) {
    const type = getModalType();

    const getElements = iframe => {};

    function fetchTerms(amount) {}

    function isValidAmount(amount) {
        if (numberIsNaN(Number(amount))) {
            return false;
        }

        const [int = '', dec = ''] = amount.split('.');
        // Maximum value: 99999.99
        return int.length <= 5 && dec.length <= 2;
    }

    const addHandlers = () => {};

    const onLoad = () => {};

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
