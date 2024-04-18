export const DEV_DE_LONG_TERM_EN = {
    testFileName: 'longTerm',
    country: 'DE',
    description: 'DE merchant eligible for long term only',
    minAmount: 99,
    maxAmount: 5000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying DE Long Term Installments',
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
            message: 'Qualifying DE Long Term Installments',
            expectedValue: 'Bezahlen Sie in 3-24 monatlichen Raten.',
            modalContent: {
                offerHeadline: '33,82€ / Month',
                updatedOfferHeadline: '170,83€ / Month',
                offerFieldValues: ['33,82€', '2,47€', '101,47€'],
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying DE Long Term Installments',
            expectedValue: 'Bezahlen Sie in 3-24 monatlichen Raten bei Einkäufen i.H.v. 99€-5.000€.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Enter an amount no larger than 5.000€',
                aprDisclaimer: 'Eff. Annual interest rate 9,99% p.a.'
            }
        }
    ]
};
