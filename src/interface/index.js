// TODO: use this file as entry point after experiment removed
import { destroy as zoidDestroy } from 'zoid/src';

import { setup as setupMessages, destroy as destroyMessages } from '../controllers/message';
import { setup as setupModal } from '../controllers/modal';
import { getMessageComponent } from '../zoid/message';
import { getModalComponent } from '../zoid/modal';
import { getOverflowObserver, addPerformanceMeasure } from '../utils';

export { Messages } from '../controllers/message';
export { Modal as MessagesModal } from '../controllers/modal';

export function setup() {
    addPerformanceMeasure('scriptLoadDelay');

    // Load the zoid components into memory so that the zoid interface can bootstrap between parent and child
    getMessageComponent();
    getModalComponent();
    // Preload the overflow observer so that IE11 polyfills can be downloaded if needed
    getOverflowObserver();

    setupMessages();
    setupModal();
}

export function destroy() {
    zoidDestroy();
    destroyMessages();
}
