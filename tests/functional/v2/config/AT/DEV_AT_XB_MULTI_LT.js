export const DEV_AT_XB_MULTI_LT = {
    testFileName: 'longTerm',
    country: 'AT',
    description: 'AT Cross-border Multi-product merchant (Pi30 + Long Term, Long Term featured)',
    minAmount: 99,
    maxAmount: 10000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying AT Cross-border Long Term (below min)',
            expectedValue: 'Später bezahlen mit Ratenzahlung.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Enter an amount of 99€ or more.',
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        },
        {
            value: '200.00',
            message: 'Qualifying AT Cross-border Long Term Installments',
            expectedValue: 'Später bezahlen mit Ratenzahlung.',
            modalContent: {
                offerHeadline: '68,32€ / month',
                updatedOfferHeadline: '170,83€ / month',
                offerFieldValues: ['200,00€', '4,99€', '204,99€'],
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying AT Cross-border Long Term (above max)',
            expectedValue: 'Später bezahlen mit Ratenzahlung.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Enter an amount no larger than 10.000€',
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        }
    ]
};
