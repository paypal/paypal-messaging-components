const path = require('path');
const fs = require('fs');

const DIFF_DIR = path.resolve(__dirname, '../__diff_output__');

function collectDiffs() {
    const searchFolders = (folder, pathTo) => {
        const fullPath = path.resolve(pathTo, folder);
        const contents = fs.readdirSync(fullPath);

        contents.forEach(name => {
            if (fs.statSync(path.resolve(fullPath, name)).isDirectory()) {
                searchFolders(name, fullPath);
            } else if (folder === '__diff_output__') {
                const file = path.resolve(fullPath, name);
                const configName = path
                    .relative(path.resolve(__dirname, '../snapshots'), pathTo)
                    .replace(/:/g, '-')
                    .replace(/\//g, '__');

                fs.renameSync(file, path.resolve(DIFF_DIR, `${configName}__${name}`));
            }
        });
    };

    try {
        fs.rmdirSync(DIFF_DIR);
    } catch (e) {
        if (e.code === 'ENOTEMPTY') {
            console.log(e);
        }
    }

    fs.mkdirSync(DIFF_DIR);

    searchFolders('snapshots', path.resolve(__dirname, '..'));
}

collectDiffs();
