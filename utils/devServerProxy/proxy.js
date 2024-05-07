import createMessageRoutes from './messages';
import createModalRoutes from './modals';

export default (app, server, compiler) => {
    createMessageRoutes(app, server, compiler);
    createModalRoutes(app, server, compiler);

    app.post('/v1/credit/upstream-messaging-events', (req, res) => res.send(''));

    app.get('/credit-presentment/experiments/hash', (req, res) => res.send('1daf92517fb7620b02add6943517ae0a5ca8f0a0'));

    app.get('/credit-presentment/experiments/local', (req, res) => {
        const { scriptUID } = req.query;
        const interfaceScript = `<script>var interface = (window.opener ?? window.parent).document.querySelector('[data-uid-auto="${scriptUID}"]').outerHTML; document.write(interface);</script>`;
        const initializerScript = `
            <script>
                window.xprops.onReady({
                    treatmentsHash: '1daf92517fb7620b02add6943517ae0a5ca8f0a0',
                    deviceID: 'uid_e495bda3c2_mtk6mzg6mju'
                });
            </script>
        `;

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>PayPal - Pay Later</title>
            </head>
            <body>
                ${interfaceScript}
                ${initializerScript}
            </body>
            </html>
        `);
    });

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
