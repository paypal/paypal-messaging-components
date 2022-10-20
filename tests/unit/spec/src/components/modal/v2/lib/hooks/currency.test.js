import { currencyFormat } from 'src/components/modal/v2/lib/';

describe('currency format', () => {
    test('array test', () => {
        const strings = ['xyz', 'Something 123.00', 'Else 456,00', '789.00 EUR'];
        const expectedStrings = ['xyz', 'Something 123', 'Else 456', '789 €'];
        const formattedStrings = currencyFormat(strings);

        expect(formattedStrings).toEqual(expect.arrayContaining(expectedStrings));
    });

    test('replace EUR with €', () => {
        const string = '246.00 EUR';
        const expectedString = '246 €';
        const formattedString = currencyFormat(string);

        expect(formattedString).toEqual(expectedString);
    });
});
