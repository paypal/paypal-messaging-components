export const DEV_AT_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'AT',
    description: 'AT merchant eligible for long term only',
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
                belowMinAmountErr: 'Geben Sie einen Betrag größer als 99€ ein.',
                aprDisclaimer: 'Eff. Jahreszins'
            }
        },
        {
            value: '99.00',
            message: 'Qualifying AT Long Term Installments',
            expectedValue: 'Bezahlen Sie in bis zu 24 monatlichen Raten.',
            modalContent: {
                offerHeadline: '33,82€/Monat',
                updatedOfferHeadline: '170,83€/Monat',
                offerFieldValues: ['99,00€', '2,47€', '101,47€'],
                aprDisclaimer: 'Eff. Jahreszins'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying AT Long Term Installments (above max)',
            expectedValue: 'Bezahlen Sie in bis zu 24 monatlichen Raten bei Einkäufen i.H.v. 99€–10.000€.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Geben Sie einen Betrag geringer als 10.000€ ein.',
                aprDisclaimer: 'Eff. Jahreszins'
            }
        }
    ]
};
