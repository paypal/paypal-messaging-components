import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import objectValues from 'core-js-pure/stable/object/values';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';
import { ZalgoPromise } from 'zalgo-promise/src';

import getModalMarkup from '../../services/modal';
import getTerms from '../../services/terms';
import { Logger, ERRORS } from '../../services/logger';
import createContainer from '../Container';
import renderTermsTable from './termsTable';
import { initParent, getModalElements } from './utils';
import { createState, memoizeOnProps } from '../../../utils';
import { globalState, setGlobalState } from '../../../utils/globalState';

function createModal(options) {
    const wrapper = window.top.document.createElement('div');
    wrapper.setAttribute('data-pp-id', globalState.nextId);

    const [iframe, { insertMarkup }] = createContainer('iframe');
    const [parentOpen, parentClose] = initParent();
    const { track, clickUrl } = options;
    const [state, setState] = createState({
        status: 'CLOSED'
    });
    const logger = Logger.create({
        id: globalState.nextId,
        account: options.account,
        selector: '__internal__',
        type: 'Modal'
    });
    setGlobalState({ nextId: (globalState.nextId += 1) });

    function getModalType() {
        if (stringStartsWith(options.offerType, 'NI')) {
            return 'NI';
        }

        return 'EZP';
    }

    const trackModalEvent = (type, linkName, amount) =>
        track({
            et: type === 'modal-open' ? 'CLIENT_IMPRESSION' : 'CLICK',
            link: linkName,
            amount,
            modal: getModalType(),
            event_type: type
        });

    function resetAccordions() {
        arrayFrom(state.elements.accordions).forEach(accordion => {
            accordion.classList.remove('show');

            const content = accordion.getElementsByClassName('accordion-content')[0];
            content.style.setProperty('max-height', null);
        });
    }

    function showTab(name, suppressTrackingEvent) {
        const tabs = {
            'NI Tab': [state.elements.niTab, state.elements.niContent],
            'EZP Tab': [state.elements.ezpTab, state.elements.ezpContent]
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

    function ensureReady() {
        if (state.error) {
            // eslint-disable-next-line no-use-before-define
            return prepModal(true);
        }

        return state.modalProm;
    }

    function openModal(evt) {
        evt.preventDefault();

        if (state.status === 'CLOSED' || state.status === 'CLOSING') {
            setState({ status: 'OPENING' });
            ensureReady().then(() => {
                if (state.error) {
                    setState({ status: 'CLOSED' });
                    window.open(clickUrl, '_blank');
                    return;
                }

                wrapper.style.display = 'block';
                // Ensure iframe has been painted so that it's focusable in Firefox
                // Focus iframe window so that keyboard events interact with the modal
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        resetAccordions();
                        iframe.contentWindow.focus();
                        setState({ status: 'OPEN' });
                        parentOpen();
                        state.elements.modalContainer.classList.add('show');

                        trackModalEvent('modal-open');
                    })
                );
            });
        }
    }

    function closeModal(delay) {
        return new ZalgoPromise((resolve, reject) => {
            if (state.status === 'OPEN' || state.status === 'OPENING') {
                setState({ status: 'CLOSING' });
                state.elements.modalContainer.classList.remove('show');

                setTimeout(() => {
                    wrapper.style.display = 'none';
                    iframe.blur();
                    setState({ status: 'CLOSED' });
                    parentClose();

                    if (getModalType() === 'EZP') {
                        // Ensure the EZP tab is active every time the modal is opened
                        setTimeout(() => {
                            showTab('EZP Tab', true);
                        }, 350);
                    }

                    resolve();
                }, delay || 0);
            } else {
                reject();
            }
        });
    }

    function closeEvent(link) {
        closeModal(350);
        trackModalEvent('modal-close', link);
    }

    function fetchTerms(amount) {
        const convertedAmount = +amount;
        if (!numberIsNaN(convertedAmount)) {
            state.elements.amountInput.value = convertedAmount.toFixed(2);
        }

        state.elements.loader.style.setProperty('opacity', 1);
        state.elements.financeTermsTable.style.setProperty('opacity', 0.4);

        return getTerms({
            ...options,
            amount
        }).then(terms => {
            state.elements.loader.style.setProperty('opacity', 0);
            state.elements.financeTermsTable.style.setProperty('opacity', 1);
            state.elements.financeTermsTable.innerHTML = renderTermsTable(terms);
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

    function addModalEventHandlers() {
        state.elements.closeButton.addEventListener('click', () => {
            closeEvent('Close Button');
        });

        state.elements.overlay.addEventListener('click', ({ target }) => {
            if (target === state.elements.contentWrapper || target === state.elements.headerContainer) {
                closeEvent('Modal Overlay');
            }
        });

        const onScroll = () => {
            if (state.elements.contentWrapper.scrollTop > 0) {
                state.elements.header.classList.add('show');
            } else {
                state.elements.header.classList.remove('show');
            }
        };

        state.elements.contentWrapper.addEventListener('scroll', onScroll);

        state.elements.contentWrapper.addEventListener('touchmove', onScroll);

        arrayFrom(state.elements.accordions).forEach(accordion => {
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

        iframe.contentWindow.addEventListener('keyup', evt => {
            if (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27) {
                closeEvent('Escape Key');
            }
        });

        arrayFrom(state.elements.landerLinks).forEach(link => {
            link.addEventListener('click', () => trackModalEvent('lander-link'));
        });

        if (getModalType() === 'EZP') {
            state.elements.niTab.addEventListener('click', () => showTab('NI Tab'));
            state.elements.ezpTab.addEventListener('click', () => showTab('EZP Tab'));

            const calculateTerms = link => {
                const amount = state.elements.amountInput.value;
                trackModalEvent('calculate', link, amount);
                fetchTerms(amount);
            };

            state.elements.amountInput.addEventListener('keydown', evt => {
                const { key, target } = evt;

                if (key.length > 1 || evt.metaKey || evt.ctrlKey) {
                    if (key === 'Enter') {
                        calculateTerms('Enter Key');
                    }
                    return;
                }

                const val = target.value;
                const position = target.selectionStart;
                const newVal = val ? `${val.slice(0, position)}${key}${val.slice(position)}` : key;

                if (isValidAmount(newVal)) {
                    target.value = newVal;
                    target.setSelectionRange(position + 1, position + 1);
                }

                evt.preventDefault();
            });

            state.elements.calculateButton.addEventListener('click', () => calculateTerms('Calculate Button'));
        }
    }

    function prepModal(ignoreCache = false) {
        // Account required in the start event on the server-side
        logger.start({
            options: {
                account: options.account,
                offerType: options.offerType,
                amount: options.amount,
                message_id: options.id
            }
        });

        return getModalMarkup(options, ignoreCache)
            .then(insertMarkup)
            .then(() => {
                setState({
                    elements: getModalElements(iframe, getModalType())
                });

                addModalEventHandlers();
            })
            .catch(() => {
                logger.error({ name: ERRORS.MODAL_FAIL });
                setState({ error: true });
            })
            .then(() => logger.end());
    }

    // Accessibility tags
    wrapper.setAttribute('role', 'alertdialog');
    wrapper.setAttribute('aria-label', 'PayPal Credit Promotion Modal');
    wrapper.setAttribute(
        'style',
        'display: none; overflow: auto; -webkit-overflow-scrolling: touch; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 2147483647; margin: 0; padding: 0; border: 0;'
    );
    iframe.setAttribute(
        'style',
        'position: absolute; top: 0; left: 0; overflow: hidden; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; display: block;'
    );

    wrapper.appendChild(iframe);
    window.top.document.body.appendChild(wrapper);

    setState({ modalProm: prepModal() });

    if (getModalType() === 'EZP') {
        ensureReady().then(() => fetchTerms(options.amount));
    }

    return {
        open: openModal,
        close: closeModal
    };
}

const getModal = memoizeOnProps(createModal, ['account', 'amount', 'offerType']);

export default {
    init({ options, meta, events, track }) {
        if (options._legacy && stringStartsWith(meta.offerType, 'NI')) {
            events.on('click', evt => {
                const { target } = evt;

                if (target.tagName === 'IMG' && target.parentNode.tagName === 'A') {
                    window.open(
                        target.parentNode.href,
                        'PayPal Credit Terms',
                        'width=650,height=600,scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no'
                    );

                    evt.preventDefault();
                } else {
                    window.open(meta.clickUrl, '_blank');
                }
            });
        } else {
            const { open: openModal } = getModal({ ...options, ...meta, track });
            events.on('click', openModal);
        }
    }
};
