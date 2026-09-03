import { __test__ } from '../../../../utils/devServerProxy/messages';

describe('v2 message variable resolution', () => {
    test('resolves short-term TEXT_VARIABLE entries including periodic_payment_count path', () => {
        const v2Template = {
            offer_types: ['PAY_LATER_SHORT_TERM']
        };

        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'periodic_payment_count',
                    text: '{PAY_LATER_SHORT_TERM.periodic_payment_count}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.periodic_payment_count'
                },
                {
                    type: 'TEXT',
                    text: ' payments on purchases of '
                },
                {
                    type: 'TEXT_VARIABLE',
                    name: 'min_amount',
                    text: '{PAY_LATER_SHORT_TERM.min_amount.formatted_value}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.min_amount.formatted_value'
                },
                {
                    type: 'TEXT',
                    text: '-'
                },
                {
                    type: 'TEXT_VARIABLE',
                    name: 'max_amount',
                    text: '{PAY_LATER_SHORT_TERM.max_amount.formatted_value}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.max_amount.formatted_value'
                }
            ],
            action_items: []
        };

        const morsVars = {
            financing_code: 'fin_short_123',
            total_payments: 4,
            formattedMinAmount: '$30.00',
            formattedMaxAmount: '$1,500.00'
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Template,
            v2Content,
            morsVars,
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '4' });
        expect(resolved.main_items[2]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$30' });
        expect(resolved.main_items[4]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$1,500' });
        expect(warnings).toEqual([]);
    });

    test('resolves long-term product.* text_path entries', () => {
        const v2Template = {
            offer_types: ['PAY_LATER_LONG_TERM']
        };

        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'min_amount',
                    text: '{PAY_LATER_LONG_TERM.min_amount.formatted_value}',
                    text_path: '{PAY_LATER_LONG_TERM.preferred_offer.financing_code}.product.min_amount.formatted_value'
                },
                {
                    type: 'TEXT_VARIABLE',
                    name: 'max_amount',
                    text: '{PAY_LATER_LONG_TERM.max_amount.formatted_value}',
                    text_path: '{PAY_LATER_LONG_TERM.preferred_offer.financing_code}.product.max_amount.formatted_value'
                }
            ],
            action_items: []
        };

        const morsVars = {
            financing_code: 'fin_long_456',
            formattedMinAmount: '$199.00',
            formattedMaxAmount: '$5,000.00'
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Template,
            v2Content,
            morsVars,
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$199' });
        expect(resolved.main_items[1]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$5,000' });
        expect(warnings).toEqual([]);
    });

    test('resolves periodic_payment formatted_value via breakdown path', () => {
        const v2Template = {
            offer_types: ['PAY_LATER_SHORT_TERM']
        };

        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'periodic_payment',
                    text: '{PAY_LATER_SHORT_TERM.periodic_payment.formatted_value}',
                    text_path:
                        '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.breakdown.periodic_payment.formatted_value'
                }
            ]
        };

        const morsVars = {
            financing_code: 'fin_short_789',
            formattedPeriodicPayment: '$25.00'
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Template,
            v2Content,
            morsVars,
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$25' });
        expect(warnings).toEqual([]);
    });

    test('resolves max_periodic_payment_count via product path', () => {
        const v2Template = {
            offer_types: ['PAY_LATER_LONG_TERM']
        };

        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'max_periodic_payment_count',
                    text: '{PAY_LATER_LONG_TERM.max_periodic_payment_count}',
                    text_path: '{PAY_LATER_LONG_TERM.preferred_offer.financing_code}.product.max_periodic_payment_count'
                }
            ]
        };

        const morsVars = {
            financing_code: 'fin_long_012',
            total_payments: 12
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Template,
            v2Content,
            morsVars,
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '12' });
        expect(warnings).toEqual([]);
    });

    test('resolves financing-code interpolation when offer type contains digits', () => {
        const v2Template = {
            offer_types: ['PAY_LATER_PAY_IN_1']
        };

        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'min_amount',
                    text: '{PAY_LATER_PAY_IN_1.min_amount.formatted_value}',
                    text_path: '{PAY_LATER_PAY_IN_1.preferred_offer.financing_code}.min_amount.formatted_value'
                }
            ]
        };

        const morsVars = {
            financing_code: 'fin_pay_in_1_999',
            formattedMinAmount: '30,00€'
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Template,
            v2Content,
            morsVars,
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '30€' });
        expect(warnings).toEqual([]);
    });

    test('prefers product-scoped mors vars over default vars for mixed-offer templates', () => {
        const v2Content = {
            main_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'periodic_payment_count',
                    text: '{PAY_LATER_SHORT_TERM.preferred_offer.periodic_payment_count}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.periodic_payment_count'
                }
            ]
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Content,
            morsVars: {
                total_payments: 24
            },
            morsVarsByProduct: {
                PAY_LATER_SHORT_TERM: {
                    total_payments: 4
                }
            },
            warnings
        });

        expect(resolved.main_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '4' });
        expect(warnings).toEqual([]);
    });

    test('resolves TEXT_VARIABLE entries in action_items and disclaimer_items', () => {
        const v2Content = {
            main_items: [],
            action_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'payment_count_action',
                    text: '{PAY_LATER_SHORT_TERM.periodic_payment_count}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.periodic_payment_count'
                }
            ],
            disclaimer_items: [
                {
                    type: 'TEXT_VARIABLE',
                    name: 'min_amount_disclaimer',
                    text: '{PAY_LATER_SHORT_TERM.min_amount.formatted_value}',
                    text_path: '{PAY_LATER_SHORT_TERM.preferred_offer.financing_code}.min_amount.formatted_value'
                }
            ]
        };

        const warnings = [];

        const resolved = __test__.resolveV2ContentVariables({
            v2Content,
            morsVars: {
                total_payments: 4,
                formattedMinAmount: '$10.00'
            },
            warnings
        });

        expect(resolved.action_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '4' });
        expect(resolved.disclaimer_items[0]).toMatchObject({ type: 'TEXT_VARIABLE', text: '$10' });
        expect(warnings).toEqual([]);
    });

    test('formats EUR strings with trimmed zero cents like legacy message rendering', () => {
        expect(__test__.formatCurrencyText('1,00€')).toBe('1€');
        expect(__test__.formatCurrencyText('1,00 EUR')).toBe('1 €');
    });
});
