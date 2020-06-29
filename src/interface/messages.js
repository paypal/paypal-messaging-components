import { setup as setupMessageComponent } from '../controllers/message';

export { Messages } from '../controllers/message';
export { Modal } from '../controllers/modal';

export function setup() {
    setupMessageComponent();
}
