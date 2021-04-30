const fs = require('fs-extra');

module.exports = function CopyOutputWebpackPlugin({ version }) {
    return {
        apply: compiler => {
            compiler.hooks.afterEmit.tapAsync('AfterEmitPlugin', async compilation => {
                const { path: filepath } = compilation.outputOptions;
                // Get webpack output filenames
                const outputAssets = Object.keys(compilation.assets);
                await Promise.all(
                    outputAssets.map(async filename => {
                        // Get source code for updating source map references
                        const sourceCode = await fs.readFile(`${filepath}/${filename}`, 'utf8');
                        // e.g. messaging@1.0.0.js
                        const filenameVersioned = filename.replace(
                            /([^.]*)(.*)/,
                            (_, p1, p2) => `${p1}@${version}${p2}`
                        );
                        const sourceCodeWithVersion = `/* version: ${version} */\n${sourceCode}`;
                        // Update source map reference for versioned copies
                        const sourceCodeVersioned = sourceCode.replace(
                            /^\/\/# sourceMappingURL=.*$/m,
                            `//# sourceMappingURL=${filenameVersioned}.map`
                        );
                        // Write files to root environment directory and the nested versioned directory
                        return Promise.all([
                            fs.outputFile(`${filepath}/${filename}`, sourceCodeWithVersion),
                            fs.outputFile(`${filepath}/versioned/${filenameVersioned}`, sourceCodeVersioned)
                        ]);
                    })
                );
            });
        }
    };
};
