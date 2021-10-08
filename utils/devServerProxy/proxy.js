import createMessageRoutes from './messages';
import createModalRoutes from './modals';

export default (app, server, compiler) => {
    createMessageRoutes(app, server, compiler);
    createModalRoutes(app, server, compiler);

    app.post('/credit-presentment/log', (req, res) => res.send(''));

    // Support versioned URLs
    app.get('/versioned/:component', (req, res) => {
        const { component } = req.params;
        const [, componentName] = component.match(/([\w-]+?)@/);

        return res.redirect(`/${componentName}.js`);
    });
    // Mimic sdk path by rewriting /sdk/js to the webpack output file /sdk.js
    app.use((req, res, next) => {
        req.url = req.url.replace(/\/sdk\/js/, '/sdk.js');
        next();
    });
};
