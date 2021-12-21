import { Messages, MessagesModal, setup } from './interface';

// Manual window assignments as opposed to using the built in
// webpack library export due to the webpack not being able
// to export more than one named export onto an existing object
window.paypal = window.paypal ?? {};
window.paypal.Messages = Messages;
window.paypal.MessagesModal = MessagesModal;

setup();
