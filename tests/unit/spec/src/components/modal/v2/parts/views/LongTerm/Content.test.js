import { getAPRDetails } from 'src/components/modal/v2/parts/views/LongTerm/Content';

const buildOffer = (totalPayments, apr, disclaimer) => ({
    meta: { qualifying: 'true', total_payments: totalPayments, apr },
    content: { disclaimer }
});

describe('getAPRDetails', () => {
    test.each([
        ['ascending order (US/ES/IT/CA-shaped)', ['6', '12', '24']],
        ['descending order (AT/DE/FR-shaped)', ['24', '12', '6']]
    ])('pairs each offer with its own disclaimer by total_payments, given %s', (_, order) => {
        const offers = order.map(totalPayments =>
            buildOffer(totalPayments, '9.99', { nonZeroAPR: `disclaimer-${totalPayments}` })
        );

        const result = getAPRDetails({ offers, genericDisclaimer: 'generic', disclaimer: {} });

        expect(result['6'].aprDisclaimer).toBe('disclaimer-6');
        expect(result['12'].aprDisclaimer).toBe('disclaimer-12');
        expect(result['24'].aprDisclaimer).toBe('disclaimer-24');
    });

    test('falls back to the generic default when no offers qualify', () => {
        const offers = [{ meta: { qualifying: 'false', total_payments: '6' }, content: {} }];

        const result = getAPRDetails({ offers, genericDisclaimer: 'generic', disclaimer: {} });

        expect(result.default.aprDisclaimer).toBe('generic');
    });
});
