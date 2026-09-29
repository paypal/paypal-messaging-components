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

    // AT euro formatting: comma decimal separator + period thousands separator.
    describe('AT euro formatting', () => {
        test.each([
            ['99,00 EUR', '99 €'], // comma decimals stripped, EUR → €
            ['10.000,00 EUR', '10.000 €'], // thousands separator preserved
            ['1.234.567,00 EUR', '1.234.567 €'], // multiple thousands separators preserved
            ['99,99 EUR', '99,99 €'], // non-zero cents kept
            ['1.234,00', '1.234'] // thousands-separated amount with no currency token
        ])('formats %s as %s', (input, expected) => {
            expect(currencyFormat(input)).toEqual(expected);
        });
    });
});
