const PACKAGES = ['components', 'library', 'renderer'];

module.exports = (env = {}) => {
    const configs = PACKAGES.reduce(
        // eslint-disable-next-line import/no-dynamic-require, global-require
        (acc, packageName) => acc.concat([], require(`./packages/${packageName}/webpack.config`)(env)),
        []
    );

    return configs;
};
