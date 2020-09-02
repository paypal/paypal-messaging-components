require('@babel/register')({
    extends: 'grumbler-scripts/config/.babelrc-node',
    ignore: [/node_modules/],
    cwd: __dirname
});

module.exports = require('./proxy').default;
