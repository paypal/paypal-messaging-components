import { mapClasses } from 'server/v2/utils/mapClasses';
import { buildContentLabel } from 'server/v2/utils/buildContentLabel';
import { buildLogoConfiguration } from 'server/v2/utils/buildLogoConfiguration';

describe('mapClasses', () => {
    test('joins truthy entries as space-separated string', () => {
        expect(mapClasses({ main: true, left: true, black: true })).toBe('main left black');
    });

    test('excludes falsy entries', () => {
        expect(mapClasses({ main: true, right: false, black: true })).toBe('main black');
    });

    test('lowercases and replaces underscores with dashes', () => {
        expect(mapClasses({ LOGO_TYPE: true })).toBe('logo-type');
    });

    test('excludes empty string keys', () => {
        expect(mapClasses({ '': true, main: true })).toBe('main');
    });

    test('returns empty string when all entries are falsy', () => {
        expect(mapClasses({ main: false, action: false })).toBe('');
    });
});

describe('buildContentLabel', () => {
    test('joins text fields from TEXT items', () => {
        const items = [
            { type: 'TEXT', text: 'Pay Later' },
            { type: 'TEXT', text: 'with PayPal' }
        ];
        expect(buildContentLabel(items)).toBe('Pay Later with PayPal');
    });

    test('uses alternative_text field for IMAGE items', () => {
        const items = [
            { type: 'IMAGE', alternative_text: 'PayPal logo', source_url: 'logo.svg' },
            { type: 'TEXT', text: 'Pay Later' }
        ];
        expect(buildContentLabel(items)).toBe('PayPal logo Pay Later');
    });

    test('filters empty text', () => {
        const items = [
            { type: 'TEXT', text: '' },
            { type: 'TEXT', text: 'Pay Later' }
        ];
        expect(buildContentLabel(items)).toBe('Pay Later');
    });

    test('trims whitespace from each item', () => {
        const items = [{ type: 'TEXT', text: '  Pay Later  ' }];
        expect(buildContentLabel(items)).toBe('Pay Later');
    });

    test('returns empty string for empty array', () => {
        expect(buildContentLabel([])).toBe('');
    });
});

describe('buildLogoConfiguration', () => {
    const logoItem = { type: 'IMAGE', source_url: 'logo.svg', alternative_text: 'PayPal', name: 'paypal_logo' };
    const textItem = { type: 'TEXT', text: 'Pay Later' };

    test('extracts IMAGE block and filters from mainBlocks for left position', () => {
        const result = buildLogoConfiguration({
            logoType: 'primary',
            logoPosition: 'left',
            mainItems: [logoItem, textItem]
        });
        expect(result.logoBlock).toBe(logoItem);
        expect(result.mainBlocks).toEqual([textItem]);
        expect(result.hasInitialLogo).toBe(true);
        expect(result.hasRightLogo).toBe(false);
    });

    test('sets hasRightLogo for right position', () => {
        const result = buildLogoConfiguration({
            logoType: 'primary',
            logoPosition: 'right',
            mainItems: [textItem, logoItem]
        });
        expect(result.hasRightLogo).toBe(true);
        expect(result.hasInitialLogo).toBe(false);
    });

    test('sets hasInitialLogo for top position', () => {
        const result = buildLogoConfiguration({
            logoType: 'primary',
            logoPosition: 'top',
            mainItems: [logoItem, textItem]
        });
        expect(result.hasInitialLogo).toBe(true);
        expect(result.hasRightLogo).toBe(false);
    });

    test('inline logo type extracts IMAGE into logoBlock and removes it from mainBlocks', () => {
        const result = buildLogoConfiguration({
            logoType: 'inline',
            logoPosition: 'left',
            mainItems: [logoItem, textItem]
        });
        expect(result.logoBlock).toBe(logoItem);
        expect(result.mainBlocks).toEqual([textItem]);
        expect(result.hasInitialLogo).toBe(false);
        expect(result.hasRightLogo).toBe(false);
    });

    test('returns no logo block when no IMAGE items present', () => {
        const result = buildLogoConfiguration({ logoType: 'primary', logoPosition: 'left', mainItems: [textItem] });
        expect(result.logoBlock).toBeUndefined();
        expect(result.hasInitialLogo).toBe(false);
        expect(result.mainBlocks).toEqual([textItem]);
    });
});
