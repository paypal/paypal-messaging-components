import { setup, Modal } from './controllers/modal';
import { addPerformanceMeasure } from '../utils';

window.credit = window.credit ?? {};
window.credit.Modal = Modal;

addPerformanceMeasure('scriptLoadDelay');
setup();
