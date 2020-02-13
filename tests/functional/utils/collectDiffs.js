const path = require('path');
const fs = require('fs');
const imgur = require('imgur');

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

async function uploadToImgur() {
    const snapshots = fs.readdirSync(DIFF_DIR);

    if (snapshots.length > 0) {
        const album = await imgur.createAlbum();

        const result = await Promise.all(
            snapshots.map(fileName =>
                imgur.uploadFile(path.resolve(DIFF_DIR, fileName), album.data.deletehash, fileName)
            )
        );

        console.log('\n');
        console.log(
            `\u001b[31m;1m${result.length} failed snapshots uploaded and viewable at https://imgur.com/a/${album.data.id}`
        );
        console.log('\n');

        process.exit(1);
    } else {
        console.log(`No snapshots found in ${DIFF_DIR}`);
    }
}

collectDiffs();

uploadToImgur().catch(e => console.log(e));
