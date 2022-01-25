import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { gbModalContent } from './fr_modalTestDefs';

const accounts = ['DEV000000FRPL', 'DEV00000FRPLQ'];

describe.each([
    [accounts[0], viewports[0], bannerStyles[0]],
    [accounts[0], viewports[1], bannerStyles[0]],
    [accounts[1], viewports[0], bannerStyles[0], amounts[3]],
    [accounts[1], viewports[1], bannerStyles[0], amounts[3]]
])('FRPL basic modal functionality tests %o', (account, viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle,
            amount
        });
    });

    const groupString = getGroupString({ viewport, bannerStyle, amount });

    test(`${groupString} x button closes modal`, xClosesModal({ account, viewport, groupString }));
    test(`${groupString} close modal on escape key press`, closeModalEsc({ account, viewport, groupString }));
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account, viewport, groupString })
    );
    test(
        `${groupString} verify that value prop in modal is correct`,
        gbModalContent({ account, viewport, groupString })
    );
});
