import { formatDateByCountry } from 'src/components/modal/v2/lib/utils';

jest.mock('src/components/modal/lib/utils', () => ({
    getContent: jest.fn().mockResolvedValue(null),
    setupTabTrap: jest.fn().mockResolvedValue(null)
}));

describe('Date function should return correct date format based on country', () => {
    it('US country date should be formatted MM/DD/YYYY', () => {
        const result = formatDateByCountry('US');
        const expectFormat = /^d{1,2}\/\d{1,2}\/\d{4}$/;
        // regual expression for MM/DD/YYYY format
        expect(result).toMatch(expectFormat);
    });
    it('All other countries date should be formatted DD/MM/YYYY', () => {
        const result = formatDateByCountry('AU');
        const expectedFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        // regular expression for DD/MM/YYYY format
        expect(result).toMatch(expectedFormat);
    });
});
