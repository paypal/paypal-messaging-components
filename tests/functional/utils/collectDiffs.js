const path = require('path');
const fs = require('fs-extra');

const DIFF_DIR = path.resolve(__dirname, '../__diff_output__');

module.exports = function collectDiffs() {
    const searchFolders = (folder, pathTo) => {
        const fullPath = path.resolve(pathTo, folder);
        const contents = fs.readdirSync(fullPath);

        contents.forEach(name => {
            if (fs.statSync(path.resolve(fullPath, name)).isDirectory()) {
                searchFolders(name, fullPath);
            } else if (folder === '__diff_output__') {
                const file = path.resolve(fullPath, name);
                const configName = path
                    .relative(path.resolve(__dirname, '../banners'), pathTo)
                    .replace(/:/g, '-')
                    .replace(/\//g, '__');

                fs.renameSync(file, path.resolve(DIFF_DIR, `${configName}__${name}`));
            }
        });
    };

    try {
        fs.removeSync(DIFF_DIR);
        fs.mkdirSync(DIFF_DIR);
    } catch (e) {
        console.log(e);
    }

    searchFolders('banners', path.resolve(__dirname, '..'));
};
