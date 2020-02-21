import createContainer from 'src/messages/models/Container';

describe('createContainer', () => {
    it('Creates iframe container', () => {
        const [container, helperFns] = createContainer('iframe');

        expect(container.tagName).toBe('IFRAME');
        expect(helperFns).toEqual(
            expect.objectContaining({
                insertMarkup: expect.any(Function),
                setSize: expect.any(Function),
                runStats: expect.any(Function),
                events: expect.objectContaining({
                    on: expect.any(Function),
                    clear: expect.any(Function)
                }),
                clearEvents: expect.any(Function)
            })
        );
    });

    it('Creates div container', () => {
        const [container, helperFns] = createContainer('div');

        expect(container.tagName).toBe('DIV');
        expect(helperFns).toEqual(
            expect.objectContaining({
                insertMarkup: expect.any(Function),
                setSize: expect.any(Function),
                runStats: expect.any(Function),
                events: expect.objectContaining({
                    on: expect.any(Function),
                    clear: expect.any(Function)
                }),
                clearEvents: expect.any(Function)
            })
        );
    });

    it('Transform an HTML element into a container', () => {
        const element = document.createElement('div');
        element.appendChild(document.createTextNode('test'));
        const [container, helperFns] = createContainer(element);

        expect(container.tagName).toBe('DIV');
        expect(container.innerHTML).toBe('test');
        expect(helperFns).toEqual(
            expect.objectContaining({
                insertMarkup: expect.any(Function),
                setSize: expect.any(Function),
                runStats: expect.any(Function),
                events: expect.objectContaining({
                    on: expect.any(Function),
                    clear: expect.any(Function)
                }),
                clearEvents: expect.any(Function)
            })
        );
    });
});
