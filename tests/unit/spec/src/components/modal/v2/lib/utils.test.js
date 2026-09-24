import {
    formatDateByCountry,
    validateProps,
    openPrequalification,
    createPrequalToken,
    setupTabTrap
} from 'src/components/modal/v2/lib/utils';
import { uniqueID } from '@krakenjs/belter/src';

jest.mock('@krakenjs/belter/src', () => {
    const original = jest.requireActual('@krakenjs/belter/src');
    return {
        ...original,
        uniqueID: jest.fn(() => 'uid_a1b2c3d4e5_mte3mja')
    };
});

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
    jest.restoreAllMocks();
    uniqueID.mockReturnValue('uid_a1b2c3d4e5_mte3mja');
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

describe('createPrequalToken', () => {
    it('returns a token with UM- prefix', () => {
        const token = createPrequalToken();

        expect(token.startsWith('UM-')).toBe(true);
    });

    it('returns an uppercase token with no underscores', () => {
        const token = createPrequalToken();

        expect(token).toMatch(/^UM-[A-Z0-9]+$/);
    });

    it('strips uid prefix and replaces with UM-', () => {
        uniqueID.mockReturnValue('uid_a1b2c3d4e5_mte3mja');

        const token = createPrequalToken();

        expect(token).toBe('UM-A1B2C3D4E5MTE3MJA');
    });

    it('produces unique tokens on each call', () => {
        let callCount = 0;
        uniqueID.mockImplementation(() => {
            callCount += 1;
            return `uid_${callCount}abcdef01_mte3mja`;
        });

        const token1 = createPrequalToken();
        const token2 = createPrequalToken();

        expect(token1).not.toEqual(token2);
    });

    it('produces a token within the 36-char limit', () => {
        const token = createPrequalToken();

        expect(token.length).toBeLessThanOrEqual(36);
    });
});

describe('setupTabTrap', () => {
    let closeBtn;
    let payMonthlyBtn;
    let payIn4Btn;
    let paypalCreditBtn;

    const dispatchTabKey = (shiftKey = false) => {
        const event = new KeyboardEvent('keydown', { keyCode: 9, shiftKey, cancelable: true });
        window.dispatchEvent(event);
        return event;
    };

    beforeAll(() => {
        // trapTabKey listener is attached once for the module's lifetime, mirroring real usage
        // (setupTabTrap is called once per modal instance in Container.jsx)
        setupTabTrap();
    });

    beforeEach(() => {
        document.body.innerHTML = `
            <button id="close">Close</button>
            <button id="pay-monthly">Pay monthly</button>
            <button id="pay-in-4">Pay in 4 interest</button>
            <button id="paypal-credit">PayPal Credit</button>
        `;
        closeBtn = document.getElementById('close');
        payMonthlyBtn = document.getElementById('pay-monthly');
        payIn4Btn = document.getElementById('pay-in-4');
        paypalCreditBtn = document.getElementById('paypal-credit');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('wraps focus from the last focusable element to the first on Tab', () => {
        paypalCreditBtn.focus();

        const event = dispatchTabKey(false);

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(closeBtn);
    });

    it('wraps focus from the first focusable element to the last on Shift+Tab', () => {
        closeBtn.focus();

        const event = dispatchTabKey(true);

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(paypalCreditBtn);
    });

    it('does not hijack Shift+Tab away from the last element, so focus can move backward through the middle buttons (regression for DTCRCMERC-5668)', () => {
        paypalCreditBtn.focus();

        const event = dispatchTabKey(true);

        // Native backward tab navigation (unblocked) would move focus to pay-in-4,
        // not get force-wrapped back to the first element like plain Tab does.
        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(paypalCreditBtn);
    });

    it('does not hijack Tab away from the first element when Shift is not held', () => {
        closeBtn.focus();

        const event = dispatchTabKey(false);

        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(closeBtn);
    });

    it('does nothing for a middle element regardless of Shift state', () => {
        payMonthlyBtn.focus();

        const forwardEvent = dispatchTabKey(false);
        expect(forwardEvent.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(payMonthlyBtn);

        payIn4Btn.focus();
        const backwardEvent = dispatchTabKey(true);
        expect(backwardEvent.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(payIn4Btn);
    });
});

describe('openPrequalification', () => {
    it('redirects with auto-generated UM token and offer param', () => {
        openPrequalification({ offer: 'PAY_LATER_SHORT_TERM' });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=UM-A1B2C3D4E5MTE3MJA&offer=PAY_LATER_SHORT_TERM'
        );
    });

    it('redirects with auto-generated UM token when no params provided', () => {
        openPrequalification();

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=UM-A1B2C3D4E5MTE3MJA'
        );
    });

    it('omits offer when offer is explicitly undefined', () => {
        openPrequalification({ offer: undefined });

        expect(window.location.assign).toHaveBeenCalledWith(
            'https://www.paypal.com/paylateracq/prequalify?token=UM-A1B2C3D4E5MTE3MJA'
        );
    });

    it('generates a token with UM- prefix and uppercase characters', () => {
        openPrequalification({ offer: 'PAY_LATER_SHORT_TERM' });

        const url = window.location.assign.mock.calls[0][0];
        const token = new URL(url).searchParams.get('token');

        expect(token).toMatch(/^UM-[A-Z0-9]+$/);
    });

    it('generates unique tokens across multiple CTA clicks', () => {
        let callCount = 0;
        uniqueID.mockImplementation(() => {
            callCount += 1;
            return `uid_${callCount}abcdef01_mte3mja`;
        });

        openPrequalification({ offer: 'PAY_LATER_SHORT_TERM' });
        const url1 = window.location.assign.mock.calls[0][0];
        const token1 = new URL(url1).searchParams.get('token');

        openPrequalification({ offer: 'PAY_LATER_SHORT_TERM' });
        const url2 = window.location.assign.mock.calls[1][0];
        const token2 = new URL(url2).searchParams.get('token');

        expect(token1).not.toEqual(token2);
    });
});
