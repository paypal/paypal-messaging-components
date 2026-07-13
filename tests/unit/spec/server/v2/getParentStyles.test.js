import getParentStyles from 'server/v2/getParentStyles';

describe('v2 getParentStyles flex', () => {
    test('returns empty string when ratio is not provided', () => {
        expect(getParentStyles({ layout: 'flex' })).toBe('');
    });

    test('returns empty string for text layout with no ratio', () => {
        expect(getParentStyles({ layout: 'text' })).toBe('');
    });

    test.each([['1x1'], ['1x4'], ['8x1'], ['20x1']])('generates wrapper class pp-flex--%s for flex ratio %s', ratio => {
        const result = getParentStyles({ layout: 'flex', ratio });
        expect(result).toContain(`pp-flex--${ratio}`);
    });

    test.each([['1x1'], ['1x4'], ['8x1'], ['20x1']])('includes iframe positioning rules for ratio %s', ratio => {
        const result = getParentStyles({ layout: 'flex', ratio });
        expect(result).toContain('position: absolute');
        expect(result).toContain('width: 100%');
        expect(result).toContain('height: 100%');
        expect(result).toContain('iframe');
    });

    test.each([['1x1'], ['1x4'], ['8x1'], ['20x1']])(
        'includes ::before padding-top aspect ratio rule for ratio %s',
        ratio => {
            const result = getParentStyles({ layout: 'flex', ratio });
            expect(result).toContain('::before');
            expect(result).toContain('padding-top');
        }
    );

    test('1x1 uses 100% padding-top (square)', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '1x1' });
        expect(result).toContain('padding-top: 100%');
    });

    test('1x1 constrains width between 120px and 300px', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '1x1' });
        expect(result).toContain('min-width: 120px');
        expect(result).toContain('max-width: 300px');
    });

    test('1x4 uses 200% initial padding-top then 400% at breakpoint', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '1x4' });
        expect(result).toContain('padding-top: 200%');
        expect(result).toContain('padding-top: 400%');
    });

    test('1x4 switches to 400% padding-top at 768px breakpoint', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '1x4' });
        expect(result).toContain('@media (min-width: 768px)');
        const afterBreakpoint = result.slice(result.indexOf('@media (min-width: 768px)'));
        expect(afterBreakpoint).toContain('padding-top: 400%');
    });

    test('8x1 uses ~16.67% initial padding-top then 12.5% at breakpoint', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '8x1' });
        expect(result).toContain('padding-top: 12.5%');
    });

    test('8x1 switches aspect ratio at 768px breakpoint', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '8x1' });
        expect(result).toContain('@media (min-width: 768px)');
    });

    test('20x1 switches to 5% padding-top at 768px breakpoint', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '20x1' });
        expect(result).toContain('padding-top: 5%');
        expect(result).toContain('@media (min-width: 768px)');
    });

    test('20x1 constrains width at breakpoint between 350px and 1169px', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '20x1' });
        expect(result).toContain('min-width: 350px');
        expect(result).toContain('max-width: 1169px');
    });

    test('wrapper has display block and box-sizing border-box', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '8x1' });
        expect(result).toContain('display: block');
        expect(result).toContain('box-sizing: border-box');
    });

    test('wrapper has position relative for iframe stacking context', () => {
        const result = getParentStyles({ layout: 'flex', ratio: '8x1' });
        expect(result).toContain('position: relative');
    });

    test('does not mix flex ratioMap into non-flex layout', () => {
        // For text layout with a ratio string, it should not use the flex ratioMap
        const flexResult = getParentStyles({ layout: 'flex', ratio: '8x1' });
        const textResult = getParentStyles({ layout: 'text', ratio: '8x1' });
        // text layout parses '8x1' as a plain ratio string, not the flex ratioMap
        // both produce output but the flex one uses the full responsive ratioMap config
        expect(flexResult).toContain('@media (min-width: 768px)');
        // text layout treats '8x1' as a single ratio entry with no breakpoint
        expect(textResult).not.toContain('@media (min-width: 768px)');
    });
});
