import { act, renderHook } from '@testing-library/preact-hooks';
import usePrefersDarkMode from 'src/components/modal/v2/lib/hooks/prefersDarkMode';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

const createMatchMedia = ({ matches = false, useModernListener = true } = {}) => {
    const listeners = new Set();

    const mediaQueryList = {
        media: DARK_MODE_QUERY,
        matches,
        addEventListener: useModernListener
            ? jest.fn((event, listener) => {
                  if (event === 'change') {
                      listeners.add(listener);
                  }
              })
            : undefined,
        removeEventListener: useModernListener
            ? jest.fn((event, listener) => {
                  if (event === 'change') {
                      listeners.delete(listener);
                  }
              })
            : undefined,
        addListener: !useModernListener ? jest.fn(listener => listeners.add(listener)) : undefined,
        removeListener: !useModernListener ? jest.fn(listener => listeners.delete(listener)) : undefined,
        trigger(nextMatches) {
            mediaQueryList.matches = nextMatches;
            listeners.forEach(listener => listener({ matches: nextMatches }));
        }
    };

    return mediaQueryList;
};

describe('modal/v2/lib/hooks/prefersDarkMode', () => {
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
        jest.restoreAllMocks();
    });

    test('returns the current color scheme and updates on change events', () => {
        const mediaQueryList = createMatchMedia({ matches: false, useModernListener: true });
        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { result, unmount } = renderHook(() => usePrefersDarkMode());

        expect(result.current).toBe(false);
        expect(window.matchMedia).toHaveBeenCalledWith(DARK_MODE_QUERY);
        expect(mediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

        act(() => {
            mediaQueryList.trigger(true);
        });

        expect(result.current).toBe(true);

        unmount();

        expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    test('falls back to addListener when addEventListener is unavailable', () => {
        const mediaQueryList = createMatchMedia({ matches: true, useModernListener: false });
        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { result, unmount } = renderHook(() => usePrefersDarkMode());

        expect(result.current).toBe(true);
        expect(mediaQueryList.addListener).toHaveBeenCalledWith(expect.any(Function));

        act(() => {
            mediaQueryList.trigger(false);
        });

        expect(result.current).toBe(false);

        unmount();

        expect(mediaQueryList.removeListener).toHaveBeenCalledWith(expect.any(Function));
    });

    test('returns false when matchMedia is not available', () => {
        delete window.matchMedia;

        const { result } = renderHook(() => usePrefersDarkMode());

        expect(result.current).toBe(false);
    });
});
