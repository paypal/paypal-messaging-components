import { setup, Modal } from './controllers/modal';
import { addPerformanceMeasure } from '../utils';

window.paypal = window.paypal ?? {};
window.paypal.MessagesModal = options => {
    return Modal({ ...options, integrationIdentifier: 'messagesModal' });
};

addPerformanceMeasure('scriptLoadDelay');
setup();
