import validate from 'src/zoid/message/validation';

const warn = console.warn.bind(console);
console.warn = jest.fn((...args) => warn(args));

describe('validate', () => {
    beforeEach(() => {
        console.warn.mockReset();
    });

    it('validates account', () => {
        const payerId = 'DEV00000000NI';
        const clientId = 'client-id:test_client_id';
        const merchantId = 'DEV0000000NIQ';

        let account = validate.account({ props: { account: payerId } });

        expect(account).toEqual({
            id: payerId,
            type: 'payer_id'
        });
        expect(console.warn).not.toHaveBeenCalled();

        account = validate.account({ props: { account: clientId } });

        expect(account).toEqual({
            id: clientId.slice(10),
            type: 'client_id'
        });
        expect(console.warn).not.toHaveBeenCalled();

        account = validate.account({ props: { account: clientId, merchantId } });

        expect(account).toEqual({
            id: clientId.slice(10),
            type: 'client_id',
            subject: merchantId
        });
        expect(console.warn).not.toHaveBeenCalled();

        account = validate.account({ props: { account: 'invalid' } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(account)'));

        account = validate.account({ props: { account: undefined } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(account)'));

        account = validate.account({ props: { account: 12345 } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(3);
        expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(account)'));

        account = validate.account({ props: { account: clientId, merchantId: 'invalid' } });

        expect(account).toEqual({
            id: clientId.slice(10),
            type: 'client_id'
        });
        expect(console.warn).toHaveBeenCalledTimes(4);
        expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(merchantId)'));

        account = validate.account({ props: { account: clientId, merchantId: 12345 } });

        expect(account).toEqual({
            id: clientId.slice(10),
            type: 'client_id'
        });
        expect(console.warn).toHaveBeenCalledTimes(5);
        expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(merchantId)'));
    });

    it('validates amount', () => {
        [10, 100000000, '100', '100.50'].forEach(validAmount => {
            const amount = validate.amount({ props: { amount: validAmount } });

            expect(amount).toEqual(Number(validAmount));
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const amount = validate.amount({ props: {} });

            expect(amount).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        ['abc', NaN].forEach((invalidAmount, index) => {
            const amount = validate.amount({ props: { amount: invalidAmount } });

            expect(amount).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(amount)'));
        });
    });

    it('validates offer', () => {
        ['NI'].forEach(supportedOffer => {
            const offer = validate.offer({ props: { offer: supportedOffer } });

            expect(offer).toEqual(supportedOffer);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const offer = validate.offer({ props: {} });

            expect(offer).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        ['EZP', 12345, {}, null].forEach((invalidOffer, index) => {
            const offer = validate.offer({ props: { offer: invalidOffer } });

            expect(offer).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(offer)'));
        });
    });

    it('validates style', () => {
        const fallback = { layout: 'text' };

        [{ layout: 'text' }, { layout: 'flex', ratio: '1x1' }, { layout: 'text', badOption: 'abc' }].forEach(
            validStyle => {
                const style = validate.style({ props: { style: validStyle } });

                expect(style).toEqual(validStyle);
                expect(console.warn).not.toHaveBeenCalled();
            }
        );

        {
            const style = validate.style({ props: {} });

            expect(style).toEqual(fallback);
            expect(console.warn).not.toHaveBeenCalled();
        }

        [{}, { color: 'blue' }].forEach((invalidStyle, index) => {
            const style = validate.style({ props: { style: invalidStyle } });

            expect(style).toEqual(fallback);
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(style.layout)'));
        });

        console.warn.mockReset();

        ['abc', null, 12345].forEach((invalidStyle, index) => {
            const style = validate.style({ props: { style: 'abc' } });

            expect(style).toEqual(fallback);
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(style)'));
        });
    });

    it('validates currency', () => {
        ['USD', 'EUR', 'GBP'].forEach(supportedCurrency => {
            const currency = validate.currency({ props: { currency: supportedCurrency } });

            expect(currency).toEqual(supportedCurrency);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const currency = validate.currency({ props: {} });

            expect(currency).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, null, 'MXN'].forEach((invalidCurrency, index) => {
            const currency = validate.currency({ props: { currency: invalidCurrency } });

            expect(currency).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(currency)'));
        });
    });

    it('validates placement', () => {
        ['home', 'category', 'product', 'cart', 'payment'].forEach(supportedPlacement => {
            const placement = validate.placement({ props: { placement: supportedPlacement } });

            expect(placement).toEqual(supportedPlacement);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const placement = validate.placement({ props: {} });

            expect(placement).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, 'abc', null].forEach((invalidPlacement, index) => {
            const placement = validate.placement({ props: { placement: invalidPlacement } });

            expect(placement).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(placement)'));
        });
    });

    it('validates buyerCountry', () => {
        ['US', 'DE', 'GB'].forEach(supportedBuyerCountry => {
            const buyerCountry = validate.buyerCountry({ props: { buyerCountry: supportedBuyerCountry } });

            expect(buyerCountry).toEqual(supportedBuyerCountry);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const buyerCountry = validate.buyerCountry({ props: {} });

            expect(buyerCountry).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, 'abc', null].forEach((invalidBuyerCountry, index) => {
            const buyerCountry = validate.buyerCountry({ props: { buyerCountry: invalidBuyerCountry } });

            expect(buyerCountry).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(expect.stringContaining('(buyerCountry)'));
        });
    });
});
