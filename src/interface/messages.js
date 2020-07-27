import { destroy as zoidDestroy } from 'zoid/src';
import { setup as setupMessages, destroy as destroyMessages } from '../controllers/message';

export { Messages } from '../controllers/message';
export { Modal } from '../controllers/modal';

export function setup() {
    setupMessages();
}

export function destroy() {
    zoidDestroy();
    destroyMessages();
}
