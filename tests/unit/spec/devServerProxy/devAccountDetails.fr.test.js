import getDevAccountDetails from '../../../../utils/devServerProxy/lib/devAccountDetails';

describe('getDevAccountDetails FR short-term payment count', () => {
    test('uses 4 installments for FR multi short-term qualifying message', () => {
        const details = getDevAccountDetails({
            account: 'DEV_FR_MULTI',
            amount: 20,
            useV2MessageContent: true
        });

        expect(details.message.morsVars.total_payments).toBe(4);
        expect(details.message.morsVarsByProduct.PAY_LATER_SHORT_TERM.total_payments).toBe(4);
        expect(details.message.template).toContain('"type": "PLST_SQ"');
    });
});
