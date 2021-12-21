import { setup, Modal } from './controllers/modal';
import { addPerformanceMeasure } from '../utils';

window.paypal = window.paypal ?? {};
window.paypal.MessagesModal = Modal;

addPerformanceMeasure('scriptLoadDelay');
setup();
