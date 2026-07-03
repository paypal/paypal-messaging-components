export const DEV_AT_LONG_TERM_EN_0APR = {
    testFileName: 'longTerm',
    country: 'AT',
    description: 'AT merchant eligible for long term only at 0% APR - English',
    minAmount: 99,
    maxAmount: 10000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying AT Long Term Installments 0% APR',
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
            message: 'Qualifying AT Long Term Installments 0% APR',
            expectedValue: '0% eff. Jahreszins: ab',
            modalContent: {
                offerHeadline: '33,00€ / month',
                updatedOfferHeadline: '166,67€ / month',
                offerFieldValues: ['99,00€', '0,00€', '99,00€'],
                aprDisclaimer: 'Eff. Annual interest rate 0,00% p.a.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying AT Long Term Installments 0% APR (above max)',
            expectedValue: '0% eff. Jahreszins: Bezahlen Sie in 3-24 Raten',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Enter an amount no larger than 10.000€',
                aprDisclaimer: 'Eff. Annual interest rate 0,00% p.a.'
            }
        }
    ]
};
