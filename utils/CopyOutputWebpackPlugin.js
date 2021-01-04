const fs = require('fs-extra');

module.exports = function CopyOutputWebpackPlugin({ version, environments }) {
    return {
        apply: compiler => {
            compiler.hooks.afterEmit.tapAsync('AfterEmitPlugin', async compilation => {
                const { path: filepath } = compilation.outputOptions;
                // Get webpack output filenames
                const outputAssets = Object.keys(compilation.assets);
                // Duplicate assets to specified directories
                await Promise.all(
                    environments.map(async environment => {
                        const directory = environment === 'production' ? 'js' : environment;
                        await Promise.all(
                            outputAssets.map(async filename => {
                                // Get source code for updating source map references
                                const sourceCode = await fs.readFile(`${filepath}/${filename}`, 'utf8');
                                // e.g. messaging@1.0.0.js
                                const filenameVersioned = filename.replace(
                                    /([^.]*)(.*)/,
                                    (_, p1, p2) => `${p1}@${version}${p2}`
                                );
                                // Update source map reference for versioned copies
                                const sourceCodeVersioned = sourceCode.replace(
                                    /^\/\/# sourceMappingURL=.*$/m,
                                    `//# sourceMappingURL=${filenameVersioned}.map`
                                );
                                // Write files to root environment directory and the nested versioned directory
                                return Promise.all([
                                    fs.outputFile(`${filepath}/${directory}/${filename}`, sourceCode),
                                    fs.outputFile(
                                        `${filepath}/${directory}/versioned/${filenameVersioned}`,
                                        sourceCodeVersioned
                                    )
                                ]);
                            })
                        );
                    })
                );
                // Remove original assets
                await Promise.all(outputAssets.map(filename => fs.remove(`${filepath}/${filename}`)));
            });
        }
    };
};
