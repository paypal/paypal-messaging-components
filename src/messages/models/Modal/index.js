import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import getModalMarkup from '../../services/modal';
import { Logger, ERRORS } from '../../services/logger';
import createContainer from '../Container';
import { initParent, getModalElements } from './utils';
import { createState, memoizeOnProps, pipe, pluck, nextId } from '../../../utils';
import { getModalContent, getModalType } from '../../../locale';

function createModal(options) {
    const wrapper = window.top.document.createElement('div');
    const id = nextId();
    wrapper.setAttribute('data-pp-id', id);

    const [iframe, { insertMarkup }] = createContainer('iframe');
    const [parentOpen, parentClose] = initParent();
    const { track, clickUrl } = options;
    const [state, setState] = createState({
        status: 'CLOSED'
    });
    const modalType = getModalType(options.offerCountry, options.offerType);

    const trackModalEvent = (type, linkName, amount) =>
        track({
            et: type === 'modal-open' ? 'CLIENT_IMPRESSION' : 'CLICK',
            link: linkName,
            amount,
            modal: modalType,
            event_type: type
        });

    const modalContent = getModalContent(options, state, trackModalEvent);

    const logger = Logger.create({
        id,
        account: options.account,
        selector: '__internal__',
        type: 'Modal'
    });

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
                        iframe.contentWindow.focus();
                        setState({ status: 'OPEN' });
                        parentOpen();
                        state.frameElements.modalContainer.classList.add('show');

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
                state.frameElements.modalContainer.classList.remove('show');

                setTimeout(() => {
                    wrapper.style.display = 'none';
                    iframe.blur();
                    setState({ status: 'CLOSED' });
                    parentClose();
                    modalContent.onClose();

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

    function addModalEventHandlers() {
        state.frameElements.closeButton.addEventListener('click', () => {
            closeEvent('Close Button');
        });

        state.frameElements.overlay.addEventListener('click', ({ target }) => {
            if (target === state.frameElements.contentWrapper || target === state.frameElements.headerContainer) {
                closeEvent('Modal Overlay');
            }
        });

        const onScroll = () => {
            if (state.frameElements.contentWrapper.scrollTop > 0) {
                state.frameElements.header.classList.add('show');
            } else {
                state.frameElements.header.classList.remove('show');
            }
        };

        state.frameElements.contentWrapper.addEventListener('scroll', onScroll);

        state.frameElements.contentWrapper.addEventListener('touchmove', onScroll);

        iframe.contentWindow.addEventListener('keyup', evt => {
            if (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27) {
                closeEvent('Escape Key');
            }
        });

        arrayFrom(state.frameElements.landerLinks).forEach(link => {
            link.addEventListener('click', () => trackModalEvent('lander-link'));
        });

        modalContent.addHandlers(modalType, state.contentElements, trackModalEvent);
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
            .then(pipe(pluck('markup'), insertMarkup))
            .then(() => {
                setState({
                    frameElements: getModalElements(iframe),
                    contentElements: modalContent.getElements(iframe, modalType)
                });

                addModalEventHandlers();
            })
            .catch(err => {
                if (__LOCAL__) {
                    console.error(err);
                }
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

    ensureReady().then(() => modalContent.onLoad());

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
            const { open: openModal } = getModal({
                ...options,
                ...meta,
                track
            });
            events.on('click', openModal);
        }
    }
};
