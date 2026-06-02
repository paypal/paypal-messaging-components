import validateStyle from 'server/v2/validateStyle';

const mockLog = jest.fn();

describe('v2 validateStyle', () => {
    beforeEach(() => {
        mockLog.mockClear();
    });

    test('returns validated text layout with defaults', () => {
        const result = validateStyle(mockLog, { layout: 'text' });
        expect(result.layout).toBe('text');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('defaults missing layout to text without logging', () => {
        const result = validateStyle(mockLog, {});
        expect(result.layout).toBe('text');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('defaults missing style to text without logging', () => {
        const result = validateStyle(mockLog);
        expect(result.layout).toBe('text');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('defaults null style to text without logging', () => {
        const result = validateStyle(mockLog, null);
        expect(result.layout).toBe('text');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('returns validated flex layout with defaults', () => {
        const result = validateStyle(mockLog, { layout: 'flex' });
        expect(result.layout).toBe('flex');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('falls back to text layout and logs for unknown layout', () => {
        const result = validateStyle(mockLog, { layout: 'unknown' });
        expect(result.layout).toBe('text');
        expect(mockLog).toHaveBeenCalledTimes(1);
    });

    test('maps custom layout to text and logs a warning', () => {
        const result = validateStyle(mockLog, { layout: 'custom' });
        expect(result.layout).toBe('text');
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockLog.mock.calls[0][0]).toMatch(/custom/);
    });

    test('logs and corrects invalid logo.type for text layout', () => {
        const result = validateStyle(mockLog, { layout: 'text', logo: { type: 'invalid' } });
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(result.logo.type).toBe('primary');
    });

    test('accepts valid logo.type values for text layout', () => {
        ['primary', 'alternative', 'inline', 'none'].forEach(type => {
            mockLog.mockClear();
            const result = validateStyle(mockLog, { layout: 'text', logo: { type } });
            expect(result.logo.type).toBe(type);
            expect(mockLog).not.toHaveBeenCalled();
        });
    });

    test('normalises greyscale alias for text layout text.color', () => {
        const result = validateStyle(mockLog, { layout: 'text', text: { color: 'greyscale' } });
        expect(result.text.color).toBe('grayscale');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('accepts valid flex layout color values', () => {
        ['blue', 'black', 'white', 'gray', 'monochrome', 'grayscale'].forEach(color => {
            mockLog.mockClear();
            const result = validateStyle(mockLog, { layout: 'flex', color });
            expect(result.color).toBe(color);
            expect(mockLog).not.toHaveBeenCalled();
        });
    });

    test('normalises grey alias for flex layout color', () => {
        const result = validateStyle(mockLog, { layout: 'flex', color: 'grey' });
        expect(result.color).toBe('gray');
        expect(mockLog).not.toHaveBeenCalled();
    });

    test('logs type mismatch and falls back to default when wrong type is passed', () => {
        const result = validateStyle(mockLog, { layout: 'text', logo: { type: 123 } });
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockLog.mock.calls[0][0]).toMatch(/expected type/i);
        expect(result.logo.type).toBe('primary');
    });
});
