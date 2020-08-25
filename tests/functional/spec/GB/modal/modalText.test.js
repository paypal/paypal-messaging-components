import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
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

    const groupString = getGroupString({ viewport, bannerStyle, amount });

    test(`x button closes modal ${groupString}`, xClosesModal(account, viewport, bannerStyle));
    test(`close modal on escape key press ${groupString}`, closeModalEsc(account, viewport, bannerStyle));
    if (viewport.height === 1080) {
        test(`close modal on click outside ${groupString}`, clickOutsideClosesModal(account, viewport, bannerStyle));
    }
    test(
        `after modal close, modal can reopen and close again ${groupString}`,
        closeReopenModal(account, viewport, bannerStyle)
    );
    test(`verify that value prop in modal is correct ${groupString})`, gbModalContent(account, viewport, bannerStyle));
});
