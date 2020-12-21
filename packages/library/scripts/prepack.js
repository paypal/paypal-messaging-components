/* eslint-disable compat/compat, eslint-comments/disable-enable-pair, promise/no-native, security/detect-non-literal-regexp */
const path = require('path');
const fs = require('fs-extra');
const globby = require('globby');
const tar = require('tar');

const babelConfig = require('../../../babel.config');

const root = path.resolve(__dirname, '..');
const aliases = Object.entries(
    babelConfig.plugins.find(pluginConfig => Array.isArray(pluginConfig) && pluginConfig[0] === 'module-resolver')[1]
        .alias
);

// The SDK bundler does not support path aliases so we temporarily revert
// our path aliases to relative paths before packing the npm module.
// Create a tar file to capture the original files
tar.create({ file: `${root}/src.bak.tar`, cwd: root }, ['src']).then(async () => {
    // Get a list of all files in the 'src' directory
    const files = await globby(['src/**/*.{js,jsx}'], {
        cwd: root,
        ignore: ['**/node_modules/**']
    });

    // Traverse through the content of each file replacing path aliases with relative paths
    await Promise.all(
        files.map(async file => {
            const code = await fs.readFile(`${root}/${file}`, 'utf-8');

            const withoutAliases = aliases.reduce((acc, [aliasName, aliasPath]) => {
                const directory = path.parse(`${root}/${file}`).dir;
                const relativePath = path.relative(directory, aliasPath);

                return acc.replace(new RegExp(aliasName, 'g'), relativePath);
            }, code);
            // Overwrite the original file
            await fs.writeFile(`${root}/${file}`, withoutAliases);
        })
    );
});
