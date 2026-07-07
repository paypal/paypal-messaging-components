import {
    formatDateByCountry,
    validateProps,
    openPrequalification,
    getIosMajorVersionFromUserAgent
} from 'src/components/modal/v2/lib/utils';

jest.mock('src/utils', () => {
    const original = jest.requireActual('src/utils');
    return {
        ...original,
        getGlobalUrl: jest.fn(() => 'https://www.paypal.com/paylateracq/prequalify')
    };
});

const originalLocation = window.location;

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        value: { assign: jest.fn() },
        writable: true
    });
});

afterEach(() => {
    Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true
    });
    jest.clearAllMocks();
});

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

describe('openPrequalification', () => {
    it('redirects with token and offer params', () => {
        openPrequalification({ token: 'ec-token-123', offer: 'PAY_LATER_SHORT_TERM' });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=ec-token-123&offer=PAY_LATER_SHORT_TERM'
        );
    });

    it('omits offer when not provided', () => {
        openPrequalification({ token: 'ec-token-123' });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=ec-token-123'
        );
    });

    it('omits offer when offer is explicitly undefined', () => {
        openPrequalification({ token: 'ec-token-123', offer: undefined });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=ec-token-123'
        );
    });

    it('uses empty string when token is not provided', () => {
        openPrequalification({ offer: 'PAY_LATER_SHORT_TERM' });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=&offer=PAY_LATER_SHORT_TERM'
        );
    });
});

describe('getIosMajorVersionFromUserAgent', () => {
    it('returns iOS major version when UA has iOS version token', () => {
        const version = getIosMajorVersionFromUserAgent(
            'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
        );

        expect(version).toBe(26);
    });

    it('returns null when UA does not have iOS version token', () => {
        const version = getIosMajorVersionFromUserAgent(
            'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/125.0 Mobile Safari/537.36'
        );

        expect(version).toBeNull();
    });
});
