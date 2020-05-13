import createContainer from 'utils/createContainer';
import insertMarkup from 'src/messages/models/Container/insertMarkup';

// JSDOM will not fire load events, causing insertMarkup to stall out
HTMLImageElement.prototype.addEventListener = jest.fn((type, cb) => cb());

document.fonts = {
    load: () => Promise.resolve()
};

describe('insertMarkup', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('Inserts markup string into iframe container', async () => {
        const { container, getByText } = createContainer('iframe');
        const markup = '<div><script>window.meta = { test: true };</script><div>test</div></div>';

        await insertMarkup(container, markup);

        expect(getByText(/test/i)).toBeVisible();
    });

    it('Inserts template node into iframe container', async () => {
        const { container, getByText } = createContainer('iframe');
        const markup = document.createElement('div');
        markup.innerHTML = '<div><h1>test header</h1><p>learn more</p></div>';

        await insertMarkup(container, markup);

        expect(getByText(/test header/i)).toBeVisible();
        expect(getByText(/learn more/i)).toBeVisible();
    });

    it('Inserts template node into div container', async () => {
        const { container, getByText } = createContainer('div');
        const markup = document.createElement('div');
        markup.innerHTML = '<div><h1>test header</h1><p>learn more</p></div>';

        await insertMarkup(container, markup);

        expect(getByText(/test header/i)).toBeVisible();
        expect(getByText(/learn more/i)).toBeVisible();
    });
});
