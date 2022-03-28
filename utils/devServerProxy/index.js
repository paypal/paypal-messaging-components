require('@babel/register')({
    extends: '@krakenjs/grumbler-scripts/config/.babelrc-node',
    ignore: [/node_modules/],
    cwd: __dirname
});

module.exports = require('./proxy').default;
