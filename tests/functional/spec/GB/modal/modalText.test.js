import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { gbModalContent } from './gb_modalTestDefs';

const accounts = ['DEV000000GBPL', 'DEV00000GBPLQ'];

describe.each([
    [accounts[0], viewports[0], bannerStyles[0]],
    [accounts[0], viewports[1], bannerStyles[0]],
    [accounts[1], viewports[0], bannerStyles[0], amounts[3]],
    [accounts[1], viewports[1], bannerStyles[0], amounts[3]]
])('GBPL basic modal functionality tests %o', (account, viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle,
            amount
        });
    });
    test(
        `x button closes modal - ${bannerStyle.layout} ${viewport.width}`,
        xClosesModal(account, viewport, bannerStyle)
    );
    test(
        `close modal on escape key press - ${bannerStyle.layout} ${viewport.width}`,
        closeModalEsc(account, viewport, bannerStyle)
    );
    if (viewport.height === 1080) {
        test(
            `close modal on click outside - ${bannerStyle.layout} ${viewport.width}`,
            clickOutsideClosesModal(account, viewport, bannerStyle)
        );
    }
    test(
        `after modal close, modal can reopen and close again - ${bannerStyle.layout} ${viewport.width}`,
        closeReopenModal(account, viewport, bannerStyle)
    );
    test(
        `verify that value prop in modal is correct - ${bannerStyle.layout} ${viewport.width})`,
        gbModalContent(account, viewport, bannerStyle)
    );
});
