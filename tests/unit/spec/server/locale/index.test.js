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

jest.mock('server/locale/US/PPC/mutations/niq', () => ({
    'layout:text': [
        [
            'default',
            {
                styles: ['.message { style1 }', '.message .testClass { style2 }']
            }
        ]
    ]
}));

jest.mock('server/locale/US/PPC/mutations/ni', () => ({
    'layout:text': ['text', 'US', 'NI'],
    'layout:flex': ['flex', 'US', 'NI']
}));

jest.mock('server/locale/US/PPC/mutations/ezp_any_eqz', () => ({
    'layout:text': ['text', 'US', 'EZP:ANY:EQZ'],
    'layout:flex': ['flex', 'US', 'EZP:ANY:EQZ']
}));

jest.mock('server/locale/US/PPC/mutations/pala_single_eqz', () => ({
    'layout:text': ['text', 'US', 'PALA:SINGLE:EQZ'],
    'layout:flex': ['flex', 'US', 'PALA:SINGLE:EQZ']
}));

jest.mock('server/locale/US/GPL/mutations/gplq', () => ({
    'layout:text': ['text', 'US', 'GPLQ'],
    'layout:flex': ['flex', 'US', 'GPLQ']
}));

jest.mock('server/locale/DE/mutations/inst_any_eqz', () => ({
    'layout:text': ['text', 'DE', 'INST:ANY:EQZ'],
    'layout:flex': ['flex', 'DE', 'INST:ANY:EQZ']
}));

jest.mock('server/locale/DE/mutations/palaq_any_eqz', () => ({
    'layout:text': ['text', 'DE', 'PALAQ:ANY:EQZ'],
    'layout:flex': ['flex', 'DE', 'PALAQ:ANY:EQZ']
}));

jest.mock('server/locale/GB/mutations/gpl', () => ({
    'layout:text': ['text', 'GB', 'GPL'],
    'layout:flex': ['flex', 'GB', 'GPL']
}));

jest.mock('server/locale/GB/mutations/gplq', () => ({
    'layout:text': ['text', 'GB', 'GPLQ'],
    'layout:flex': ['flex', 'GB', 'GPLQ']
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
            ['US', 'PALA:SINGLE:EQZ'],
            ['US', 'GPLQ'],
            ['DE', 'INST:ANY:EQZ'],
            ['DE', 'PALAQ:ANY:EQZ'],
            ['GB', 'GPL'],
            ['GB', 'GPLQ']
        ])('returns correct mutations %s %s', (locale, offerType) => {
            const textMutations = getMutations(locale, offerType, 'layout:text', {});
            expect(textMutations).toEqual(['text', locale, offerType]);

            const flexMutations = getMutations(locale, offerType, 'layout:flex', {});
            expect(flexMutations).toEqual(['flex', locale, offerType]);
        });
    });
});
