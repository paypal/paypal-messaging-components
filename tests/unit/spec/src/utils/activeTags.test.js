import createContainer from 'utils/createContainer';
import { getActiveTags } from 'src/utils/activeTags';

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

const appendElements = (wrapper, elements) => {
    elements.forEach(el => {
        wrapper.appendChild(el);
    });
};

describe('fallback', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Returns correct sizes for visible message sections', () => {
        test('MEDIUM:NONE:SMALL', () => {
            const { container } = createContainer('div');

            appendElements(container, [document.createElement('div')]);

            // Append appropriate children to container
            const sections = [
                createSection('headline', 'medium', ['small', 'medium']),
                createSection('disclaimer', 'small', ['small', 'medium'])
            ];

            // Test for expected sizes
            const expected = createOutput(['MEDIUM', 'NONE', 'SMALL']);

            appendElements(container, sections);

            expect(expected).toEqual(getActiveTags(container));
        });

        test('LARGE:XSMALL:XSMALL', () => {
            const { container } = createContainer('div');

            appendElements(container, [document.createElement('div')]);

            const sections = [
                createSection('headline', 'large', ['xsmall', 'small', 'medium', 'large']),
                createSection('subheadline', 'xsmall', ['xsmall', 'small', 'medium']),
                createSection('disclaimer', 'xsmall', ['xsmall', 'small', 'medium'])
            ];

            const expected = createOutput(['LARGE', 'XSMALL', 'XSMALL']);

            appendElements(container, sections);

            expect(expected).toEqual(getActiveTags(container));
        });
    });

    test('Returns none given an invalid container', () => {
        // Wrapper with no elements
        const { container } = createContainer('div');

        const expected = createOutput(['NONE', 'NONE', 'NONE']);

        expect(expected).toEqual(getActiveTags(container));
    });
});
