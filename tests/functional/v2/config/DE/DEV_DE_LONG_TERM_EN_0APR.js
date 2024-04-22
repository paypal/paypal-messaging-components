export const DEV_DE_LONG_TERM_EN_0APR = {
    testFileName: 'longTerm',
    country: 'DE',
    description: 'DE merchant eligible for long term only at 0% APR',
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
                aprDisclaimer: 'Eff. Annual interest rate 0,00% p.a.'
            }
        },
        {
            value: '99.00',
            message: 'Qualifying DE Long Term Installments',
            expectedValue: 'Bezahlen Sie in 3-24 monatlichen Raten.',
            modalContent: {
                offerHeadline: '33,00€ / month',
                updatedOfferHeadline: '166,67€ / month',
                offerFieldValues: ['33,00€', '0,00€', '99,00€'],
                aprDisclaimer: 'Eff. Annual interest rate 0,00% p.a.'
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
                aprDisclaimer: 'Eff. Annual interest rate 0,00% p.a.'
            }
        }
    ]
};
