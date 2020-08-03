import { render } from 'preact';

import { setupModal } from 'src/modal';
import { useXProps } from 'src/modal/lib/hooks/helpers';

jest.mock('src/modal/lib/hooks/helpers');

describe('Modal Component', () => {
    it.todo('Creates the appropriate wrapper');
    const defaultProps = {
        type: 'NI',
        country: 'US',
        terms: {
            type: 'pala',
            minAmount: 0,
            amount: '999.99',
            formattedAmount: '999.99',
            offers: [],
            formattedMinAmount: '0'
        },
        payerId: 'ABCDE12345',
        meta: {},
        aprEntry: { formattedDate: '3/1/2020', apr: 25.49 }
    };

    const defaultXProps = {
        offer: 'NI',
        show: jest.fn(),
        track: jest.fn(),
        onProps: jest.fn()
    };

    beforeEach(() => {
        useXProps.mockReturnValue(defaultXProps);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        useXProps.mockClear();
        // Need to destroy the 'preact tree' in order to clear component state.
        render(null, document.body);
    });

    it('Should call track with the appropriate modal type', () => {
        setupModal(defaultProps);
        expect(defaultXProps.track).toBeCalledWith({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: 'NI' });

        setupModal({ ...defaultProps, type: 'EZP' });
        expect(defaultXProps.track).toBeCalledWith({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: 'EZP' });
    });

    it('Should render NI modal', () => {
        setupModal(defaultProps);

        expect(document.children[0]).toContainHTML(
            'No Interest if paid in full in 6 months on purchases of $99 or more'
        );
    });

    it('Should render EZP modal, selecting EZP tab', () => {
        useXProps.mockReturnValue({ ...defaultXProps, offer: 'EZP' });

        setupModal({ ...defaultProps, type: 'EZP' });

        expect(document.children[0]).toContainHTML('Easy Payments');

        expect(document.querySelector('.tabs').children.length).toBeGreaterThan(1);
        // EZP Tab
        expect(document.querySelector('.tabs').children[0]).toHaveClass('tab--selected');
    });

    it('Should render EZP modal, selecting NI tab', () => {
        setupModal({ ...defaultProps, type: 'EZP' });

        expect(document.querySelector('.tabs').children.length).toBeGreaterThan(1);
        // NI Tab
        expect(document.querySelector('.tabs').children[1]).toHaveClass('tab--selected');
    });
});
