export const DEV_AT_LONG_TERM_EN = {
    testFileName: 'longTerm',
    country: 'AT',
    description: 'AT merchant eligible for long term only - English',
    minAmount: 99,
    maxAmount: 10000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying AT Long Term Installments',
            expectedValue: 'Jetzt kaufen, später bezahlen.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Enter an amount of 99€ or more.',
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        },
        {
            value: '99.00',
            message: 'Qualifying AT Long Term Installments',
            expectedValue: 'Bezahlen Sie in bis zu 24 monatlichen Raten.',
            modalContent: {
                offerHeadline: '33,82€ / month',
                updatedOfferHeadline: '170,83€ / month',
                offerFieldValues: ['99,00€', '2,47€', '101,47€'],
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying AT Long Term Installments (above max)',
            expectedValue: 'Bezahlen Sie in bis zu 24 monatlichen Raten bei Einkäufen i.H.v. 99€–10.000€.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Enter an amount no larger than 10.000€',
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        }
    ]
};
