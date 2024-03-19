/** @jsx h */
import { h } from 'preact';
import { fireEvent } from '@testing-library/preact';
import { renderHook, act } from '@testing-library/preact-hooks';
import { ScrollProvider, useScroll } from 'src/components/modal/v1/lib/providers/scroll';

describe('scroll', () => {
    test('adds, calls, and removes callback', () => {
        const containerRef = {
            current: document.createElement('div')
        };

        const wrapper = ({ children }) => <ScrollProvider containerRef={containerRef}>{children}</ScrollProvider>;

        const callback1 = jest.fn();
        const callback2 = jest.fn();

        // Render first callback
        const { result, unmount } = renderHook(
            () => {
                return useScroll(callback1, []);
            },
            { wrapper }
        );

        // Ensure scrollTo performs scroll
        act(() => {
            result.current.scrollTo(100);
        });

        expect(containerRef.current.scrollTop).toBe(100);

        // Scroll should call handler
        fireEvent.scroll(containerRef.current);
        expect(callback1).toHaveBeenCalledTimes(1);

        // Add second callback
        renderHook(
            () => {
                return useScroll(callback2, []);
            },
            { wrapper }
        );

        // Scroll should call both handlers
        fireEvent.scroll(containerRef.current);
        expect(callback1).toHaveBeenCalledTimes(2);
        expect(callback2).toHaveBeenCalledTimes(1);

        // Remove first callback
        unmount();

        // Scroll should only call second handler
        fireEvent.scroll(containerRef.current);
        expect(callback1).toHaveBeenCalledTimes(2);
        expect(callback2).toHaveBeenCalledTimes(2);
    });
});
