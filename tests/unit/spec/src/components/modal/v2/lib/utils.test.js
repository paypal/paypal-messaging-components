import { formatDateByCountry } from 'src/components/modal/v2/lib/utils';

jest.mock('src/components/modal/lib/utils', () => ({
    getContent: jest.fn().mockResolvedValue(null),
    setupTabTrap: jest.fn().mockResolvedValue(null)
}));

describe('Date function should return correct date format based on country', () => {
    // /^d{1,2}\/\d{1,2}\/\d{4}$/ = regualar expression for MM/DD/YYYY format
    // /^\d{1,2}\/\d{1,2}\/\d{4}$/ = regular expression for DD/MM/YYYY format
    test.each([
        ['US', /^d{1,2}\/\d{1,2}\/\d{4}$/],
        ['AU', /^\d{1,2}\/\d{1,2}\/\d{4}$/]
    ])('should formate the date correctly', (country, expectFormat) => {
        const result = formatDateByCountry(country);
        expect(result.toMatch(expectFormat));
    });
});
