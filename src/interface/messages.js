import { setup as setupMessageComponent } from '../controllers/message';

export { Messages } from '../controllers/message';
export { Modal } from '../zoid/modal';

export function setup() {
    setupMessageComponent();
}
