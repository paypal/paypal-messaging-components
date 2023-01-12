require('@babel/register')({
    extends: '@krakenjs/babel-config-grumbler/babelrc-node',
    ignore: [/node_modules/],
    cwd: __dirname
});

module.exports = require('./proxy').default;
