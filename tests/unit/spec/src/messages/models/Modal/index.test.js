import Modal from 'src/messages/models/Modal';
import getTerms from 'src/messages/services/terms';

jest.mock('src/messages/services/modal', () => jest.fn().mockResolvedValue(''));
jest.mock('src/messages/services/terms', () => jest.fn().mockResolvedValue(''));
jest.mock('src/messages/models/Modal/termsTable', () => () => '');

const mockIframe = document.createElement('iframe');

jest.mock('src/messages/models/Container', () => () => [mockIframe, { insertMarkup: jest.fn().mockResolvedValue() }]);

const mockElement = (tagName = 'div', className = '') => {
    const div = document.createElement(tagName);

    div.className = className;

    jest.spyOn(div, 'addEventListener');

    return div;
};

const mockAccordion = () => {
    const accordion = mockElement('div', 'show');
    const header = mockElement('h3');
    const content = mockElement('div', 'accordion-content');
    content.style.setProperty('max-height', '100px');
    accordion.appendChild(header);
    accordion.appendChild(content);

    return accordion;
};

const mockModalElements = {};

const mockParentOpen = jest.fn();
const mockParentClose = jest.fn();
jest.mock('src/messages/models/Modal/utils', () => ({
    initParent: () => [mockParentOpen, mockParentClose],
    getModalElements: () => mockModalElements
}));

describe('Modal methods', () => {
    const track = jest.fn();

    const mockContentWindowFocus = jest.fn();
    const mockBlur = jest.fn();

    const events = {
        on: jest.fn()
    };

    const initModal = async account => {
        Modal.init({
            meta: {
                offerType: 'EZP:ANY:GTZ'
            },
            options: {
                id: 0,
                _legacy: false,
                amount: 100,
                countryCode: 'US',
                onRender: () => {},
                account
            },
            events,
            track
        });

        // wait for modal to fully initialize
        return new Promise(resolve => setTimeout(() => resolve(events.on.mock.calls[0][1]), 0));
    };

    const openModal = async open => {
        Object.defineProperty(mockIframe.contentWindow, 'focus', {
            value: mockContentWindowFocus
        });
        Object.defineProperty(mockIframe, 'blur', {
            value: mockBlur
        });

        open({
            preventDefault: () => {}
        });

        // Wait for modal open to complete
        await new Promise(resolve => setTimeout(() => resolve(), 100));
    };

    beforeEach(() => {
        const contentWrapper = mockElement();
        const overlay = mockElement();
        overlay.appendChild(contentWrapper);

        Object.assign(mockModalElements, {
            window: mockIframe.contentWindow,
            contentWrapper,
            overlay,
            closeButton: mockElement(),
            header: mockElement(),
            accordions: [mockAccordion(), mockAccordion()],
            modalContainer: mockElement(),
            headerContainer: mockElement(),
            ezpTab: mockElement('div', 'selected'),
            niTab: mockElement(),
            ezpContent: mockElement('div', 'show'),
            niContent: mockElement(),
            calculateButton: mockElement(),
            amountInput: mockElement('input'),
            loader: mockElement(),
            financeTermsTable: mockElement()
        });

        mockParentOpen.mockClear();
        mockParentClose.mockClear();

        track.mockClear();

        getTerms.mockClear();

        mockContentWindowFocus.mockClear();
        mockBlur.mockClear();

        events.on.mockClear();
    });

    it('should create a modal', async () => {
        await initModal('0000000000001');

        const {
            closeButton,
            overlay,
            contentWrapper,
            accordions,
            niTab,
            ezpTab,
            amountInput,
            calculateButton
        } = mockModalElements;

        // Ensure event handlers have been added
        expect(closeButton.addEventListener).toHaveBeenCalledTimes(1);
        expect(overlay.addEventListener).toHaveBeenCalledTimes(1);
        expect(contentWrapper.addEventListener).toHaveBeenCalledTimes(2);

        accordions.forEach(accordion => {
            const header = accordion.getElementsByTagName('h3')[0];
            expect(header.addEventListener).toHaveBeenCalledTimes(1);

            const content = accordion.getElementsByClassName('accordion-content')[0];
            expect(content.style.maxHeight).toBe('100px');
        });

        expect(niTab.addEventListener).toHaveBeenCalledTimes(1);
        expect(ezpTab.addEventListener).toHaveBeenCalledTimes(1);

        expect(amountInput.addEventListener).toHaveBeenCalledTimes(1);
        expect(calculateButton.addEventListener).toHaveBeenCalledTimes(1);
    });

    it('should open and close a modal', async () => {
        await initModal('0000000000002').then(openModal);

        const { closeButton, accordions, niTab, ezpTab, modalContainer, niContent, ezpContent } = mockModalElements;

        // Ensure opening actions have occurred
        const openFPTIEvt = track.mock.calls[0][0];
        expect(openFPTIEvt.et).toBe('CLIENT_IMPRESSION');
        expect(openFPTIEvt.event_type).toBe('modal-open');

        expect(modalContainer.classList.values()).toContain('show');
        expect(mockParentOpen).toHaveBeenCalledTimes(1);
        expect(mockContentWindowFocus).toHaveBeenCalledTimes(1);

        accordions.forEach(accordion => {
            const content = accordion.getElementsByClassName('accordion-content')[0];

            expect(accordion.className).not.toContain('show');
            expect(content.style.maxHeight).toBe('');
        });

        const closeEvt = new MouseEvent('click');
        closeButton.dispatchEvent(closeEvt);

        // Wait for modal close to complete
        await new Promise(resolve => setTimeout(() => resolve(), 450));

        // Ensure closing actions have occurred
        const closeFPTIEvt = track.mock.calls[1][0];
        expect(closeFPTIEvt.et).toBe('CLICK');
        expect(closeFPTIEvt.event_type).toBe('modal-close');
        expect(closeFPTIEvt.link).toBe('Close Button');

        expect(modalContainer.classList.values()).not.toContain('show');
        expect(mockBlur).toHaveBeenCalledTimes(1);
        expect(mockParentClose).toHaveBeenCalledTimes(1);

        // Wait for modal close animation to complete
        await new Promise(resolve => setTimeout(() => resolve(), 450));

        expect(niTab.classList.values()).not.toContain('selected');
        expect(niContent.classList.values()).not.toContain('show');
        expect(ezpTab.classList.values()).toContain('selected');
        expect(ezpContent.classList.values()).toContain('show');
    });

    it('should react to accordion, tab, and amount events properly', async () => {
        await initModal('0000000000003').then(openModal);

        const { niTab, amountInput, niContent, accordions } = mockModalElements;

        // Click EZP tab
        const tabEvt = new MouseEvent('click');
        niTab.dispatchEvent(tabEvt);

        expect(niTab.classList.values()).toContain('selected');
        expect(niContent.classList.values()).toContain('show');

        // Ensure closing actions have occurred
        const tabFPTIEvt = track.mock.calls[1][0];
        expect(tabFPTIEvt.et).toBe('CLICK');
        expect(tabFPTIEvt.event_type).toBe('modal-tab');

        const accordionEvt = new MouseEvent('click');
        const header = accordions[0].getElementsByTagName('h3')[0];
        header.dispatchEvent(accordionEvt);

        const content = accordions[0].getElementsByClassName('accordion-content')[0];
        expect(accordions[0].classList.values()).toContain('show');
        expect(content.style.maxHeight).not.toBe('');

        const amountEnterEvt = document.createEvent('HTMLEvents');
        amountEnterEvt.initEvent('keydown', false, true);
        amountEnterEvt.key = 'Enter';
        amountInput.dispatchEvent(amountEnterEvt);

        expect(getTerms).toHaveBeenCalledTimes(2);
    });

    it('should close a modal using escape key', async () => {
        await initModal('0000000000004').then(openModal);

        const closeEvt = new KeyboardEvent('keyup', {
            key: 'Escape'
        });
        mockIframe.contentWindow.dispatchEvent(closeEvt);

        // Wait for modal close to complete
        await new Promise(resolve => setTimeout(() => resolve(), 450));

        // Ensure closing actions have occurred
        const closeFPTIEvt = track.mock.calls[1][0];
        expect(closeFPTIEvt.et).toBe('CLICK');
        expect(closeFPTIEvt.event_type).toBe('modal-close');
        expect(closeFPTIEvt.link).toBe('Escape Key');
    });

    it('should close a modal using escape key', async () => {
        await initModal('0000000000005').then(openModal);

        const { contentWrapper } = mockModalElements;

        const closeEvt = new MouseEvent('click', { bubbles: true });
        contentWrapper.dispatchEvent(closeEvt);

        // Wait for modal close to complete
        await new Promise(resolve => setTimeout(() => resolve(), 450));

        // Ensure closing actions have occurred
        const closeFPTIEvt = track.mock.calls[1][0];
        expect(closeFPTIEvt.et).toBe('CLICK');
        expect(closeFPTIEvt.event_type).toBe('modal-close');
        expect(closeFPTIEvt.link).toBe('Modal Overlay');
    });
});
