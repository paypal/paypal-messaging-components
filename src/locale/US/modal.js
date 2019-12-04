import objectValues from 'core-js-pure/stable/object/values';
import arrayFrom from 'core-js-pure/stable/array/from';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';
import startsWith from 'core-js-pure/stable/string/starts-with';

import getTerms from '../../messages/services/terms';
import renderTermsTable from './termsTable';

export function getModalType(offerType) {
    return startsWith(offerType, 'NI') ? 'NI' : 'EZP';
}

export default function getModalContent(options, state, trackModalEvent) {
    const type = getModalType(options.offerType);

    function getEZPModalElements(iframe) {
        const ezpTab = iframe.contentDocument.getElementById('ezp-tab');
        const niTab = iframe.contentDocument.getElementById('ni-tab');
        const ezpContent = iframe.contentDocument.getElementById('ezp-content');
        const niContent = iframe.contentDocument.getElementById('ni-content');
        const calculateButton = iframe.contentDocument.getElementById('calculate-ezp');
        const amountInput = iframe.contentDocument.getElementById('number-input');
        const loader = iframe.contentDocument.getElementById('loading-image');
        const financeTermsTable = iframe.contentDocument.getElementById('financing-terms');

        return {
            ezpTab,
            niTab,
            ezpContent,
            niContent,
            calculateButton,
            amountInput,
            loader,
            financeTermsTable
        };
    }

    const getElements = iframe => {
        const accordions = iframe.contentDocument.getElementsByClassName('accordion');

        if (type === 'EZP') {
            return {
                accordions,
                ...getEZPModalElements(iframe)
            };
        }

        return { accordions };
    };

    function fetchTerms(amount) {
        const convertedAmount = +amount;
        if (!numberIsNaN(convertedAmount)) {
            // eslint-disable-next-line no-param-reassign
            state.contentElements.amountInput.value = convertedAmount.toFixed(2);
        }

        state.contentElements.loader.style.setProperty('opacity', 1);
        state.contentElements.financeTermsTable.style.setProperty('opacity', 0.4);

        return getTerms({ ...options, amount }).then(terms => {
            state.contentElements.loader.style.setProperty('opacity', 0);
            state.contentElements.financeTermsTable.style.setProperty('opacity', 1);
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

    function resetAccordions() {
        arrayFrom(state.contentElements.accordions).forEach(accordion => {
            accordion.classList.remove('show');

            const content = accordion.getElementsByClassName('accordion-content')[0];
            content.style.setProperty('max-height', null);
        });
    }

    function showTab(name, suppressTrackingEvent) {
        const tabs = {
            'NI Tab': [state.contentElements.niTab, state.contentElements.niContent],
            'EZP Tab': [state.contentElements.ezpTab, state.contentElements.ezpContent]
        };

        const targetTab = tabs[name][0];
        objectValues(tabs).forEach(([tab, content]) => {
            tab.classList.toggle('selected', tab === targetTab);
            content.classList.toggle('show', tab === targetTab);
        });

        if (!suppressTrackingEvent) {
            trackModalEvent('modal-tab', name);
        }

        resetAccordions();
    }

    const addHandlers = () => {
        arrayFrom(state.contentElements.accordions).forEach(accordion => {
            const header = accordion.getElementsByTagName('h3')[0];
            const content = accordion.getElementsByClassName('accordion-content')[0];

            header.addEventListener('click', () => {
                const added = accordion.classList.toggle('show');
                content.style.setProperty('max-height', added ? `${content.scrollHeight}px` : null);

                if (added) {
                    trackModalEvent('accordion-open', header.innerText);
                }
            });
        });

        if (type === 'EZP') {
            state.contentElements.niTab.addEventListener('click', () => showTab('NI Tab'));
            state.contentElements.ezpTab.addEventListener('click', () => showTab('EZP Tab'));

            const calculateTerms = link => {
                const amount = state.contentElements.amountInput.value;
                trackModalEvent('calculate', link, amount);
                fetchTerms(amount);
            };

            state.contentElements.amountInput.addEventListener('keydown', evt => {
                const { key, target } = evt;
                if (key.length > 1 || evt.metaKey || evt.ctrlKey) {
                    if (key === 'Enter') {
                        calculateTerms('Enter Key');
                    }
                    return;
                }

                const val = target.value;
                const startPosition = target.selectionStart;
                const endPosition = target.selectionEnd;
                const newVal = val ? `${val.slice(0, startPosition)}${key}${val.slice(endPosition)}` : key;

                if (isValidAmount(newVal)) {
                    target.value = newVal;
                    target.setSelectionRange(startPosition + 1, startPosition + 1);
                }

                evt.preventDefault();
            });

            state.contentElements.calculateButton.addEventListener('click', () => calculateTerms('Calculate Button'));
        }
    };

    const onLoad = () => {
        if (type === 'EZP') {
            fetchTerms(options.amount);
        }
    };

    const onClose = () => {
        if (type === 'EZP') {
            // Ensure the EZP tab is active every time the modal is opened
            setTimeout(() => {
                showTab('EZP Tab', true);
            }, 350);
        }
    };

    return {
        type,
        getElements,
        addHandlers,
        onLoad,
        onClose
    };
}
