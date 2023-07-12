const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const { getWebpackConfig } = require('@krakenjs/webpack-config-grumbler');
const globals = require('./globals');

const fs = new MemoryFS();

const TARGET = {
    SDK: Symbol('SDK'),
    STANDALONE: Symbol('STANDALONE'),
    MESSAGE: Symbol('MESSAGE'),
    MODAL: Symbol('MODAL')
};

const createWebpackConfig = ({ target, protocol, hostname, port, env: buildEnv }) => {
    const filename = `${target.toString()}.${protocol}.${hostname}.${port}.${buildEnv}.js`;
    const { entry, libraryTarget, modulename, env, output } = (() => {
        switch (target) {
            case 'sdk':
                return {
                    entry: './src/library/interface/index.js',
                    libraryTarget: 'var',
                    modulename: '__super_secret_hack__',
                    env: { TARGET: 'sdk' }
                };
            case 'messaging':
                return {
                    entry: `./src/library/messaging.js`,
                    libraryTarget: 'window',
                    output: { libraryExport: 'Messages' },
                    modulename: ['paypal', 'Messages'],
                    env: { TARGET: 'standalone' }
                };
            case 'smart-credit-message':
                return {
                    entry: `./src/components/message/index.js`,
                    libraryTarget: 'window',
                    modulename: 'crc',
                    env: { TARGET: 'component' } // This shouldn't matter
                };
            case 'smart-credit-modal-v2':
                return {
                    entry: `./src/components/modal/v2/index.js`,
                    libraryTarget: 'window',
                    modulename: 'crc',
                    env: { TARGET: 'component' } // This shouldn't matter
                };
            default:
                return new Error(`Invalid build target: ${target.toString()}.`);
        }
    })();
    const config = getWebpackConfig({
        entry,
        filename,
        debug: false,
        minify: true,
        env: buildEnv,
        libraryTarget,
        modulename,
        vars: {
            ...globals(env),
            // SDK only global vars
            __PROTOCOL__: protocol,
            __HOST__: port ? `${hostname}:${port}` : hostname,
            __SDK_HOST__: port ? `${hostname}:${port}` : hostname,
            __STAGE_HOST__: 'CENSORED',
            __PORT__: port,
            __PATH__: '/sdk/js',
            __NAMESPACE__: 'paypal'
        }
    });

    if (output) {
        config.output = {
            ...(config.output || {}),
            ...output
        };
    }

    config.devtool = undefined;

    return config;
};

const createWebpackBundle = async ({
    target,
    protocol = 'https',
    hostname = 'paypal.com',
    port = 443,
    env = 'production'
}) => {
    const key = `${target.toString()}.${protocol}.${hostname}.${port}.${env}`;
    const compiler = webpack(createWebpackConfig({ target, protocol, hostname, port, env }));

    compiler.outputFileSystem = fs;

    const stats = await new Promise((resolve, reject) => {
        compiler.run((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });

    const { outputPath } = stats.toJson();

    const bundleCode = fs.readFileSync(`${outputPath}/${key}.js`, 'utf-8');

    return bundleCode;
};

module.exports = {
    createWebpackBundle,
    TARGET
};
