// TODO: use this file as entry point after experiment removed
import { destroy as zoidDestroy } from 'zoid/src';
import { setup as setupMessages, destroy as destroyMessages } from '../controllers/message';
import { setup as setupModal } from '../controllers/modal';

export { Messages } from '../controllers/message';
export { Modal as MessagesModal } from '../controllers/modal';

export function setup() {
    setupMessages();
    setupModal();
}

export function destroy() {
    zoidDestroy();
    destroyMessages();
}
