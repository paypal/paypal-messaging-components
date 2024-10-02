export const DEV_DE_PAY_IN_1 = {
    testFileName: 'payIn1',
    country: 'DE',
    description: 'DE merchant eligible for pay in 1',
    minAmount: 1,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.01',
            message: 'Non-qualifying Pay in 1',
            expectedValue: 'Bezahlen Sie bei Einkäufen von 1€ bis 2.000€ erst nach 30 Tagen',
            modalContent: {
                subheadline: 'Erhältlich für Einkäufe i.H.v. 1€ - 2.000€.'
            }
        },
        {
            value: '1.00',
            message: 'Qualifying Pay in 1',
            expectedValue: 'Bezahlen Sie nach 30 Tagen',
            modalContent: {
                subheadline: 'Erhältlich für Einkäufe i.H.v. 1€ - 2.000€.'
            }
        },
        {
            value: '1000.01',
            message: 'Non-qualifying Pay in 1',
            expectedValue: 'Bezahlen Sie bei Einkäufen von 1€ bis 1.000€ erst nach 30 Tagen',
            modalContent: {
                subheadline: 'Erhältlich für Einkäufe i.H.v. 1€ - 2.000€.'
            }
        }
    ]
};
