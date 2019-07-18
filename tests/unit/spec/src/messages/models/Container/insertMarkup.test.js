import insertMarkup from 'src/messages/models/Container/insertMarkup';

const mockTemplate = document.createElement('div');
jest.mock('src/messages/models/Template', () => ({
    getTemplateNode: jest.fn((options, markup) => {
        mockTemplate.innerHTML = `<div>${markup.data.headline}</div>`;
        return mockTemplate;
    })
}));

describe('insertMarkup', () => {
    it('Inserts string as markup into iframe and returns meta object', async () => {
        const markup = '<div><script>window.meta = { test: true };</script><div>test</div></div>';
        const container = document.createElement('iframe');

        document.body.appendChild(container);

        const promiseObj = insertMarkup(container, { markup });
        container.dispatchEvent(new Event('load'));

        expect(container.contentWindow.document.body.innerHTML).toBe(markup);

        const data = await promiseObj;
        expect(data).toEqual(expect.objectContaining({ meta: expect.objectContaining({ test: true }) }));
    });

    it('Inserts object as markup into iframe and returns meta object', async () => {
        const markup = { meta: { test: true }, data: { headline: 'Test Headline' } };
        const options = {};
        const container = document.createElement('iframe');

        document.body.appendChild(container);
        const data = await insertMarkup(container, { markup, options });

        expect(container.contentWindow.document.body.innerHTML).toBe(`<div>${markup.data.headline}</div>`);
        expect(data).toEqual(expect.objectContaining({ meta: expect.objectContaining({ test: true }) }));
    });

    it('Inserts object as markup into div and returns meta object', async () => {
        const markup = { meta: { test: true }, data: { headline: 'Test Headline' } };
        const options = {};
        const container = document.createElement('div');

        document.body.appendChild(container);
        const data = await insertMarkup(container, { markup, options });

        expect(container.innerHTML).toBe(`<div>${markup.data.headline}</div>`);
        expect(data).toEqual(expect.objectContaining({ meta: expect.objectContaining({ test: true }) }));
    });
});
