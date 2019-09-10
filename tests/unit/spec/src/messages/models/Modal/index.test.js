import { getByRole, fireEvent, within, wait } from '@testing-library/dom';

import createContainer from 'utils/createContainer';
import mockEzpModal from 'src/../demo/modals/ezp.html';
import mockNiModal from 'src/../demo/modals/ni.html';
import eventsOn from 'src/messages/models/Container/events';
import Modal from 'src/messages/models/Modal';

jest.mock('src/messages/services/modal', () =>
    jest.fn(({ offerType }) => Promise.resolve({ markup: offerType === 'NI' ? mockNiModal : mockEzpModal }))
);
jest.mock('src/messages/services/terms', () => jest.fn().mockResolvedValue(''));
jest.mock('src/messages/services/logger', () => ({
    Logger: {
        create: () => ({
            start: jest.fn(),
            end: jest.fn()
        })
    }
}));
jest.mock('src/messages/models/Modal/termsTable', () => () => '');

// JSDOM will not fire load events, causing insertMarkup to stall out
HTMLImageElement.prototype.addEventListener = jest.fn((type, cb) => cb());

const createMockRenderObject = (container, { account = '1', offerType = 'EZP:ANY:GTZ' } = {}) => ({
    meta: {
        offerType
    },
    options: {
        id: 0,
        amount: 100,
        account
    },
    events: eventsOn(container),
    track: jest.fn()
});

describe('Modal methods', () => {
    afterEach(async () => {
        // TODO: Needed for tests to pass on Node 10
        await new Promise(resolve => setTimeout(resolve, 100));

        document.body.innerHTML = '';
    });

    it('Initializes a new modal', () => {
        const { container } = createContainer('iframe', '<h1>test</h1>');

        expect(document.body.children.length).toBe(1);

        Modal.init(createMockRenderObject(container, { account: '1' }));

        expect(document.body.children.length).toBe(2);
        expect(getByRole(document.body, 'alertdialog')).toBeInTheDocument();
    });

    it('Reuses the same modal', () => {
        const { container } = createContainer('iframe', '<h1>test</h1>');
        const { container: container2 } = createContainer('iframe', '<h1>test</h1>');

        expect(document.body.children.length).toBe(2);

        Modal.init(createMockRenderObject(container, { account: '2' }));
        Modal.init(createMockRenderObject(container2, { account: '2' }));

        expect(document.body.children.length).toBe(3);
        expect(getByRole(document.body, 'alertdialog')).toBeInTheDocument();
    });

    it('Opens modal when message clicked', async () => {
        const { container, getByText } = createContainer('iframe', '<h1>test</h1>');

        Modal.init(createMockRenderObject(container, { account: '3' }));

        const modal = getByRole(document.body, 'alertdialog');
        const modalContainer = modal.querySelector('iframe');
        modalContainer.contentWindow.focus = jest.fn();

        expect(modal).toBeInTheDocument();
        expect(modal).not.toBeVisible();

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());
    });

    it('Closes modal via escape key, close button click, and overlay click', async () => {
        const { container, getByText } = createContainer('iframe', '<h1>test</h1>');

        Modal.init(createMockRenderObject(container, { account: '4' }));

        const modal = getByRole(document.body, 'alertdialog');
        const modalContainer = modal.querySelector('iframe');
        modalContainer.contentWindow.focus = jest.fn();

        const { getByLabelText } = within(modalContainer.contentDocument.body);

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());

        fireEvent.keyUp(modalContainer.contentWindow, { key: 'Escape', code: 27 });

        await wait(() => expect(modal).not.toBeVisible());

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());

        fireEvent.click(getByLabelText(/close/i));

        await wait(() => expect(modal).not.toBeVisible());

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());

        fireEvent.click(modalContainer.contentDocument.querySelector('.modal__content-wrapper'));

        await wait(() => expect(modal).not.toBeVisible());
    });

    it('Switch between tabs', async () => {
        const { container, getByText } = createContainer('iframe', '<h1>test</h1>');

        Modal.init(createMockRenderObject(container, { account: '5' }));

        const modal = getByRole(document.body, 'alertdialog');
        const modalContainer = modal.querySelector('iframe');
        modalContainer.contentWindow.focus = jest.fn();

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());

        // Unable to use expect().toBeVisible() inside modal due to issue with JSDOM
        // applying CSS cascade improperly https://github.com/jsdom/jsdom/issues/2160
        const ezpTab = modalContainer.contentDocument.getElementById('ezp-tab');
        const niTab = modalContainer.contentDocument.getElementById('ni-tab');
        const ezpContent = modalContainer.contentDocument.getElementById('ezp-content');
        const niContent = modalContainer.contentDocument.getElementById('ni-content');

        expect(ezpContent).toHaveClass('show');
        expect(niContent).not.toHaveClass('show');

        fireEvent.click(niTab);

        expect(ezpContent).not.toHaveClass('show');
        expect(niContent).toHaveClass('show');

        fireEvent.click(ezpTab);

        expect(ezpContent).toHaveClass('show');
        expect(niContent).not.toHaveClass('show');
    });

    it('Toggles accordions', async () => {
        const { container, getByText } = createContainer('iframe', '<h1>test</h1>');

        Modal.init(createMockRenderObject(container, { account: '6' }));

        const modal = getByRole(document.body, 'alertdialog');
        const modalContainer = modal.querySelector('iframe');
        modalContainer.contentWindow.focus = jest.fn();

        fireEvent.click(getByText(/test/i));

        await wait(() => expect(modal).toBeVisible());

        // TODO: Use more semantic ways for interacting with these elements
        const accordion = modalContainer.contentDocument.querySelector('.accordion');
        const accordionTitle = accordion.querySelector('h3');

        // FIXME: Why is "show" present by default but then removed when the modal is opened?
        await wait(() => expect(accordion).not.toHaveClass('show'));

        fireEvent.click(accordionTitle);

        expect(accordion).toHaveClass('show');
    });
});
