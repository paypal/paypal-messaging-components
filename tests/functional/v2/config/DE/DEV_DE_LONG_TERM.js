export const DEV_DE_LONG_TERM = {
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
                belowMinAmountErr: 'Geben Sie einen Betrag größer als 99€ ein.',
                aprDisclaimer: 'Eff. Jahreszins 9,99% p.a.'
            }
        },
        {
            value: '99.00',
            message: 'Qualifying DE Long Term Installments',
            expectedValue: 'Bezahlen Sie in 3-24 monatlichen Raten.',
            modalContent: {
                offerHeadline: '33,82€/Monat',
                updatedOfferHeadline: '170,83€/Monat',
                offerFieldValues: ['33,82€', '2,47€', '101,47€'],
                aprDisclaimer: 'Eff. Jahreszins 9,99% p.a.'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying DE Long Term Installments',
            expectedValue: 'Bezahlen Sie in 3-24 monatlichen Raten bei Einkäufen i.H.v. 99€-5.000€.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Geben Sie einen Betrag geringer als 5.000€ ein.',
                aprDisclaimer: 'Eff. Jahreszins 9,99% p.a.'
            }
        }
    ]
};
