import { setup } from './controllers/modal';
import { addPerformanceMeasure } from '../utils';

addPerformanceMeasure('scriptLoadDelay');
setup();
