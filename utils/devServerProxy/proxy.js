import createMessageRoutes from './messages';
import createModalRoutes from './modals';

export default (app, server, compiler) => {
    createMessageRoutes(app, server, compiler);
    createModalRoutes(app, server, compiler);

    app.post('/credit-presentment/log', (req, res) => res.send(''));

    app.get('/credit-presentment/experiments/hash', (req, res) => res.send('1daf92517fb7620b02add6943517ae0a5ca8f0a0'));

    app.get('/credit-presentment/experiments/local', (req, res) =>
        res.send(`
            <!DOCTYPE html>
            <head>
            </head>
            <body>
                <script>
                    function sendTreatments () {
                        window.parent.postMessage({
                            treatmentsHash: '1daf92517fb7620b02add6943517ae0a5ca8f0a0',
                            deviceID: 'uid_e495bda3c2_mtk6mzg6mju'
                        }, '*');
                    }
                        
                    function getTreatments () {
                        sendTreatments();
                    }

                    window.addEventListener('load', getTreatments);
                </script>
            </body>
        `)
    );

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
