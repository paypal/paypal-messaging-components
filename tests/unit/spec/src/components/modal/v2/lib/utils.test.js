import { formatDateByCountry, validateProps } from 'src/components/modal/v2/lib/utils';

describe('Date function should return correct date format based on country', () => {
    it('US country date should be formatted MM/DD/YYYY', () => {
        const result = formatDateByCountry('US');
        const expectFormat = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
        // regual expression for MM/DD/YYYY format
        expect(result).toMatch(expectFormat);
    });
    it('All other countries date should be formatted DD/MM/YYYY', () => {
        const result = formatDateByCountry('AU');
        const expectedFormat = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        // regular expression for DD/MM/YYYY format
        expect(result).toMatch(expectedFormat);
    });
});

describe('validateProps', () => {
    it('validates amount, contextualComponents, and offerType, and preserves value of other props', () => {
        const propsToFix = {
            amount: '10',
            offerType: 'PAY_LATER_SHORT_TERM, PAY_LATER_LONG_TERM',
            contextualComponents: 'paypal_button'
        };
        const propsToPreserve = {
            itemSkus: ['123', '456'],
            presentationMode: 'auto'
        };

        const output = validateProps({ ...propsToFix, ...propsToPreserve });

        const fixedPropOutputValues = {
            amount: 10,
            offer: 'PAY_LATER_LONG_TERM,PAY_LATER_SHORT_TERM',
            contextualComponents: 'PAYPAL_BUTTON'
        };
        expect(output).toMatchObject({ ...fixedPropOutputValues, ...propsToPreserve });
    });
});
