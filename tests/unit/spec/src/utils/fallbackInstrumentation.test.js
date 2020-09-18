import createContainer from 'utils/createContainer';
import { instrumentFallback } from 'src/utils/fallbackInstrumentation';

const createOutput = sizes => {
    const [head, sub, disc] = sizes;
    return `headline:${head}::subheadline:${sub}::disclaimer:${disc}`;
};

// e.g headline,  medium, [medium, small]
const createSection = (section, sizeDisplayed, sizes) => {
    // Any element (e.g. div) should work as a container for these purposes but,
    // appropriate element created here for consistency.
    const sectionWrapper = document.createElement(
        {
            headline: 'h5',
            subheadline: 'h6',
            disclaimer: 'p'
        }[section]
    );

    sectionWrapper.classList.add(`message__${section}`);

    sizes.forEach(size => {
        const span = document.createElement('span');

        span.style.display = size === sizeDisplayed ? 'inline' : 'none';

        span.classList.add(`tag--${size}`);

        sectionWrapper.appendChild(span);
    });

    return sectionWrapper;
};

const appendElements = (iframe, elements) => {
    elements.forEach(el => {
        iframe.contentDocument.body.appendChild(el);
    });
};

describe('fallback', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Returns correct sizes for visible message sections', () => {
        const { container } = createContainer('iframe');

        test('MEDIUM:NONE:SMALL', () => {
            appendElements(container, [document.createElement('div')]);

            // Append appropriate children to container
            const sections = [
                createSection('headline', 'medium', ['small', 'medium']),
                createSection('disclaimer', 'small', ['small', 'medium'])
            ];

            // Test for expected sizes
            const expected = createOutput(['MEDIUM', 'NONE', 'SMALL']);

            appendElements(container, sections);

            expect(expected).toEqual(instrumentFallback(container));
        });

        test('LARGE:XSMALL:XSMALL', () => {
            appendElements(container, [document.createElement('div')]);

            const sections = [
                createSection('headline', 'large', ['xsmall', 'small', 'medium', 'large']),
                createSection('subheadline', 'xsmall', ['xsmall', 'small', 'medium']),
                createSection('disclaimer', 'xsmall', ['xsmall', 'small', 'medium'])
            ];

            const expected = createOutput(['LARGE', 'XSMALL', 'XSMALL']);

            appendElements(container, sections);

            expect(expected).toEqual(instrumentFallback(container));
        });
    });

    it('Returns none given an invalid container', () => {
        // Iframe with no elements
        const { container } = createContainer('iframe');

        const expected = createOutput(['NONE', 'NONE', 'NONE']);

        expect(expected).toEqual(instrumentFallback(container));
    });
});
