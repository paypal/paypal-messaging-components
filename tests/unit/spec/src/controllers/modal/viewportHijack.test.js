/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import useViewportHijack from 'src/controllers/modal/viewportHijack';

describe('modal viewport hijack', () => {
    afterEach(() => {
        document.head.innerHTML = '';
    });

    it('Replaces the existing viewport with a new one', () => {
        const [hijackViewport, replaceViewport] = useViewportHijack();
        const defaultViewport = (<meta name="viewport" content="test=true" />).render(dom({ doc: document }));
        document.head.appendChild(defaultViewport);

        expect(defaultViewport).toBeInTheDocument();

        hijackViewport();

        const newViewport = document.head.querySelector('meta[name="viewport"]');

        expect(newViewport).not.toBe(defaultViewport);
        expect(defaultViewport).not.toBeInTheDocument();
        expect(newViewport.getAttribute('content')).toBe(
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
        );

        replaceViewport();

        expect(newViewport).not.toBeInTheDocument();
        expect(defaultViewport).toBeInTheDocument();
    });

    it('Creates an empty viewport if one is missing', () => {
        const [hijackViewport, replaceViewport] = useViewportHijack();
        const missingViewport = document.head.querySelector('meta[name="missingViewport"]');

        expect(missingViewport).toBeNull();

        hijackViewport();

        const newViewport = document.head.querySelector('meta[name="viewport"]');

        expect(newViewport.getAttribute('content')).toBe(
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
        );

        replaceViewport();

        const emptyViewport = document.head.querySelector('meta[name="viewport"]');

        expect(emptyViewport).not.toBe(newViewport);
        expect(newViewport).not.toBeInTheDocument();
        expect(emptyViewport.getAttribute('content')).toBe('');
    });

    it('Removes scrollbar with overflow hidden', () => {
        const [hijackViewport, replaceViewport] = useViewportHijack();

        expect(document.body.getAttribute('style')).toBe('');

        hijackViewport();

        expect(document.body.getAttribute('style')).toBe('overflow: hidden;');

        replaceViewport();

        expect(document.body.getAttribute('style')).toBe('');

        document.body.style.display = 'block';
        document.body.style.color = 'black';

        hijackViewport();

        expect(document.body.getAttribute('style')).toBe('display: block; color: black; overflow: hidden;');

        replaceViewport();

        expect(document.body.getAttribute('style')).toBe('display: block; color: black;');
    });
});
