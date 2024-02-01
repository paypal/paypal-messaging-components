/* eslint-disable no-console */
import validate from 'src/library/zoid/message/validation';

console.warn = jest.fn();

describe('validate', () => {
    beforeEach(() => {
        console.warn.mockClear();
    });

    test('validates account', () => {
        const payerId = 'DEV00000000NI';
        const clientId = 'client-id:test_client_id';

        let account = validate.account({ props: { account: payerId } });

        expect(account).toEqual(payerId);
        expect(console.warn).not.toHaveBeenCalled();

        account = validate.account({ props: { account: clientId } });

        expect(account).toEqual(clientId);
        expect(console.warn).not.toHaveBeenCalled();

        account = validate.account({ props: { account: 'invalid' } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'account' })
        );

        account = validate.account({ props: { account: undefined } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'account' })
        );

        account = validate.account({ props: { account: 12345 } });

        expect(account).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(3);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'account' })
        );
    });

    test('validates merchantId', () => {
        let merchantId = validate.merchantId({ props: { merchantId: 'DEV00000000NI' } });

        expect(merchantId).toEqual(merchantId);
        expect(console.warn).not.toHaveBeenCalled();

        merchantId = validate.merchantId({ props: { merchantId: 'DEV00000000NI,DEV00000001NI' } });
        expect(merchantId).toEqual(merchantId);
        expect(console.warn).not.toHaveBeenCalled();

        merchantId = validate.merchantId({ props: { merchantId: 'DEV00000000,DEV00000001NI' } });

        expect(merchantId).toEqual(merchantId);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'merchantId' })
        );

        merchantId = validate.merchantId({ props: { merchantId: 'client-id:test_client_id' } });

        expect(merchantId).toEqual(merchantId);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'merchantId' })
        );

        merchantId = validate.merchantId({ props: {} });

        expect(merchantId).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(1);

        merchantId = validate.merchantId({ props: { merchantId: 12345 } });

        expect(merchantId).toBeUndefined();
        expect(console.warn).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenLastCalledWith(
            expect.stringContaining('invalid_option_value'),
            expect.objectContaining({ location: 'merchantId' })
        );
    });

    test('validates amount', () => {
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
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'amount' })
            );
        });
    });

    // offer passed in test
    test('validates offer', () => {
        [
            'PAY_LATER_SHORT_TERM',
            'PAY_LATER_LONG_TERM',
            'PAY_LATER_PAY_IN_1',
            'PAYPAL_CREDIT_NO_INTEREST',
            'PAYPAL_CREDIT_INSTALLMENTS',
            'NI'
        ].forEach(supportedOffer => {
            const offer = validate.offer({ props: { offer: supportedOffer } });

            expect(offer).toEqual(supportedOffer);
            expect(console.warn).not.toHaveBeenCalled();
        });

        // no offer passed in test
        {
            const offer = validate.offer({ props: {} });

            expect(offer).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        ['EZP', 12345, {}, null].forEach((invalidOffer, index) => {
            expect(() => {
                validate.offer({ props: { offer: invalidOffer } });
            }).toThrow('offer_validation_error');
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'offer' })
            );
        });
    });

    test('validates style', () => {
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

        console.warn.mockClear();

        ['abc', null, 12345].forEach((invalidStyle, index) => {
            const style = validate.style({ props: { style: invalidStyle } });

            expect(style).toEqual(fallback);
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'style' })
            );
        });
    });

    test('validates currency', () => {
        ['USD', 'EUR', 'GBP', 'AUD'].forEach(supportedCurrency => {
            const currency = validate.currency({ props: { currency: supportedCurrency } });

            expect(currency).toEqual(supportedCurrency);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const currency = validate.currency({ props: {} });

            expect(currency).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, null].forEach((invalidCurrency, index) => {
            const currency = validate.currency({ props: { currency: invalidCurrency } });

            expect(currency).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'currency' })
            );
        });
    });

    test('validates placement', () => {
        ['home', 'category', 'product', 'cart', 'payment', 'product-list'].forEach(supportedPlacement => {
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
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'placement' })
            );
        });
    });

    test('validates pageType', () => {
        [
            'home',
            'category',
            'product-listing',
            'search-results',
            'product-details',
            'mini-cart',
            'cart',
            'checkout'
        ].forEach(supportedPageType => {
            const pageType = validate.pageType({ props: { pageType: supportedPageType } });

            expect(pageType).toEqual(supportedPageType);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const pageType = validate.pageType({ props: {} });

            expect(pageType).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, 'abc', null].forEach((invalidPageType, index) => {
            const pageType = validate.pageType({ props: { pageType: invalidPageType } });

            expect(pageType).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'pageType' })
            );
        });
    });

    test('validates buyerCountry', () => {
        ['US', 'DE', 'FR', 'GB', 'AU'].forEach(supportedBuyerCountry => {
            const buyerCountry = validate.buyerCountry({ props: { buyerCountry: supportedBuyerCountry } });

            expect(buyerCountry).toEqual(supportedBuyerCountry);
            expect(console.warn).not.toHaveBeenCalled();
        });

        {
            const buyerCountry = validate.buyerCountry({ props: {} });

            expect(buyerCountry).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }

        [12345, null].forEach((invalidBuyerCountry, index) => {
            const buyerCountry = validate.buyerCountry({ props: { buyerCountry: invalidBuyerCountry } });

            expect(buyerCountry).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
            expect(console.warn).toHaveBeenLastCalledWith(
                expect.stringContaining('invalid_option_value'),
                expect.objectContaining({ location: 'buyerCountry' })
            );
        });
    });
    test('validates features', () => {
        //  features passed
        ['DEMO', 'test', 'FEATURE'].forEach(validFeatures => {
            const features = validate.features({ props: { features: validFeatures } });

            expect(features).toEqual(validFeatures);
            expect(console.warn).not.toHaveBeenCalled();
        });
        // no features passed
        {
            const features = validate.features({ props: {} });

            expect(features).toBeUndefined();
            expect(console.warn).not.toHaveBeenCalled();
        }
        // invalid features pass
        [12345, null, {}, ['Hi']].forEach((invalidFeature, index) => {
            const features = validate.features({ props: { features: invalidFeature } });

            expect(features).toBeUndefined();
            expect(console.warn).toHaveBeenCalledTimes(index + 1);
        });
    });
});
