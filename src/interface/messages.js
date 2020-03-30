import { setup as setupMessageComponent } from '../zoid/message';

export { Messages } from '../zoid/message';
export { Modals } from '../zoid/modal';

export function setup() {
    setupMessageComponent();
}
