import { getMutations } from 'server/locale';

jest.mock('@paypal/sdk-logos/src', () => {
    const mock = () => ({
        render: () => 'src="data:image&#x2F;svg+xml;base64,svg"'
    });

    return {
        PayPalLogo: mock,
        PPLogo: mock,
        PPMonochrome: mock,
        LOGO_COLOR: {
            DEFAULT: '',
            WHITE: '',
            BLACK: '',
            MONOCHROME: ''
        }
    };
});

jest.mock('server/locale/US/PAYPAL_CREDIT/mutations/ppc_ni_q', () => ({
    'layout:text': [
        [
            'default',
            {
                styles: ['.message { style1 }', '.message .testClass { style2 }']
            }
        ]
    ]
}));

jest.mock('server/locale/US/PAYPAL_CREDIT/mutations/ppc_ni_nq', () => ({
    'layout:text': ['text', 'US', 'NI'],
    'layout:flex': ['flex', 'US', 'NI']
}));

jest.mock('server/locale/US/PAYPAL_CREDIT/mutations/ppc_ezp_nq_eqz', () => ({
    'layout:text': ['text', 'US', 'EZP:ANY:EQZ'],
    'layout:flex': ['flex', 'US', 'EZP:ANY:EQZ']
}));

jest.mock('server/locale/US/PAYPAL_CREDIT/mutations/ppc_ezp_single_eqz', () => ({
    'layout:text': ['text', 'US', 'PALA:SINGLE:EQZ'],
    'layout:flex': ['flex', 'US', 'PALA:SINGLE:EQZ']
}));

jest.mock('server/locale/US/PAY_LATER_SHORT_TERM/mutations/short_term_q', () => ({
    'layout:text': ['text', 'US', 'GPLQ'],
    'layout:flex': ['flex', 'US', 'GPLQ']
}));

jest.mock('server/locale/DE/GPL/mutations/gpl_eqz', () => ({
    'layout:text': ['text', 'DE', 'GPL:EQZ'],
    'layout:flex': ['flex', 'DE', 'GPL:EQZ']
}));

jest.mock('server/locale/DE/GPL/mutations/gpl_gtz', () => ({
    'layout:text': ['text', 'DE', 'GPL:GTZ'],
    'layout:flex': ['flex', 'DE', 'GPL:GTZ']
}));

jest.mock('server/locale/DE/GPL/mutations/gplq_eqz', () => ({
    'layout:text': ['text', 'DE', 'GPLQ:EQZ'],
    'layout:flex': ['flex', 'DE', 'GPLQ:EQZ']
}));

jest.mock('server/locale/DE/GPL/mutations/gplq_gtz', () => ({
    'layout:text': ['text', 'DE', 'GPLQ:GTZ'],
    'layout:flex': ['flex', 'DE', 'GPLQ:GTZ']
}));

jest.mock('server/locale/DE/GPL/mutations/gpl_eqz-non-de', () => ({
    'layout:text': ['text', 'DE', 'GPL:EQZ:NON-DE'],
    'layout:flex': ['flex', 'DE', 'GPL:EQZ:NON-DE']
}));

jest.mock('server/locale/DE/GPL/mutations/gpl_gtz-non-de', () => ({
    'layout:text': ['text', 'DE', 'GPL:GTZ:NON-DE'],
    'layout:flex': ['flex', 'DE', 'GPL:GTZ:NON-DE']
}));

jest.mock('server/locale/DE/GPL/mutations/gplq_eqz-non-de', () => ({
    'layout:text': ['text', 'DE', 'GPLQ:EQZ:NON-DE'],
    'layout:flex': ['flex', 'DE', 'GPLQ:EQZ:NON-DE']
}));

jest.mock('server/locale/DE/GPL/mutations/gplq_gtz-non-de', () => ({
    'layout:text': ['text', 'DE', 'GPLQ:GTZ:NON-DE'],
    'layout:flex': ['flex', 'DE', 'GPLQ:GTZ:NON-DE']
}));

jest.mock('server/locale/DE/Pi30/mutations/pi30', () => ({
    'layout:text': ['text', 'DE', 'PI30'],
    'layout:flex': ['flex', 'DE', 'PI30']
}));

jest.mock('server/locale/DE/Pi30/mutations/pi30q', () => ({
    'layout:text': ['text', 'DE', 'PI30Q'],
    'layout:flex': ['flex', 'DE', 'PI30Q']
}));

jest.mock('server/locale/GB/mutations/gpl', () => ({
    'layout:text': ['text', 'GB', 'PL'],
    'layout:flex': ['flex', 'GB', 'PL']
}));

jest.mock('server/locale/GB/mutations/gplq', () => ({
    'layout:text': ['text', 'GB', 'PLQ'],
    'layout:flex': ['flex', 'GB', 'PLQ']
}));

jest.mock('server/locale/FR/mutations/gpl', () => ({
    'layout:text': ['text', 'FR', 'GPL'],
    'layout:flex': ['flex', 'FR', 'GPL']
}));

jest.mock('server/locale/FR/mutations/gplq', () => ({
    'layout:text': ['text', 'FR', 'GPLQ'],
    'layout:flex': ['flex', 'FR', 'GPLQ']
}));

jest.mock('server/locale/AU/mutations/gpl', () => ({
    'layout:text': ['text', 'AU', 'GPL'],
    'layout:flex': ['flex', 'AU', 'GPL']
}));

jest.mock('server/locale/AU/mutations/gplq', () => ({
    'layout:text': ['text', 'AU', 'GPLQ'],
    'layout:flex': ['flex', 'AU', 'GPLQ']
}));

describe('locale methods', () => {
    describe('getMutations', () => {
        test('returns empty value for custom message', () => {
            const mutations = getMutations('US', 'NI', 'layout:custom', {});
            expect(mutations).toEqual({});
        });

        test('adds locale class to styles', () => {
            const mutations = getMutations('US', 'NIQ', 'layout:text', {});

            expect(mutations[0][1].styles).toEqual([
                '.locale--US .message { style1 }',
                '.locale--US .message .testClass { style2 }'
            ]);
        });

        test.each([
            ['US', 'NI'],
            ['US', 'EZP:ANY:EQZ'],
            ['US', 'GPLQ'],
            ['DE', 'GPL:EQZ'],
            ['DE', 'GPL:GTZ'],
            ['DE', 'GPLQ:EQZ'],
            ['DE', 'GPLQ:GTZ'],
            ['DE', 'GPL:EQZ:NON-DE'],
            ['DE', 'GPL:GTZ:NON-DE'],
            ['DE', 'GPLQ:EQZ:NON-DE'],
            ['DE', 'GPLQ:GTZ:NON-DE'],
            ['DE', 'PI30'],
            ['DE', 'PI30Q'],
            ['GB', 'PL'],
            ['GB', 'PLQ'],
            ['FR', 'GPL'],
            ['FR', 'GPLQ'],
            ['AU', 'GPL'],
            ['AU', 'GPLQ']
        ])('returns correct mutations %s %s', (locale, offerType) => {
            const textMutations = getMutations(locale, offerType, 'layout:text', {});
            expect(textMutations).toEqual(['text', locale, offerType]);

            const flexMutations = getMutations(locale, offerType, 'layout:flex', {});
            expect(flexMutations).toEqual(['flex', locale, offerType]);
        });
    });
});
