const path = require('path');
const fs = require('fs');
const imgur = require('imgur');

const DIFF_DIR = path.resolve(__dirname, '../__diff_output__');

function collectDiffs() {
    const searchFolders = (folder, pathTo) => {
        const fullPath = path.resolve(pathTo, folder);
        const contents = fs.readdirSync(fullPath);

        contents.forEach(name => {
            console.log({
                folder,
                path: path.resolve(fullPath, name),
                isDirectory: fs.statSync(path.resolve(fullPath, name)).isDirectory(),
                isDiffOutputFolder: folder === '__diff_output__'
            });
            if (fs.statSync(path.resolve(fullPath, name)).isDirectory()) {
                searchFolders(name, fullPath);
            } else if (folder === '__diff_output__') {
                const file = path.resolve(fullPath, name);
                const configName = path
                    .relative(path.resolve(__dirname, '../snapshots'), pathTo)
                    .replace(/:/g, '-')
                    .replace(/\//g, '__');

                const subDir = file.includes('/modal/') ? 'modal' : 'banner';
                const newFile = path.resolve(DIFF_DIR, subDir, `${configName}__${name}`);
                console.info(`Move: ${file}\n    To: ${newFile}`);
                fs.renameSync(file, newFile);
            }
        });
    };

    try {
        fs.rmdirSync(DIFF_DIR);
    } catch (e) {
        if (e.code === 'ENOTEMPTY') {
            console.error(e);
        }
    }

    fs.mkdirSync(DIFF_DIR);
    fs.mkdirSync(path.resolve(DIFF_DIR, 'modal'));
    fs.mkdirSync(path.resolve(DIFF_DIR, 'banner'));

    searchFolders('snapshots', path.resolve(__dirname, '..'));
}

async function uploadToImgur(subDir) {
    const folder = path.resolve(DIFF_DIR, subDir);
    const snapshots = fs.readdirSync(folder);

    if (snapshots.length > 0) {
        const album = await imgur.createAlbum();

        const result = await Promise.all(
            snapshots.map(fileName => imgur.uploadFile(path.resolve(folder, fileName), album.data.deletehash, fileName))
        );

        const albumUrl = `https://imgur.com/a/${album.data.id}`;
        console.info(`\n\u001b[31m${result.length} failed ${subDir} snapshots uploaded and viewable at ${albumUrl}\n`);
    } else {
        console.info(`No snapshots found in ${folder}`);
    }

    return snapshots.length;
}

console.group('COLLECTING DIFFS');
collectDiffs();

(async () => {
    const [bannerDiffs, modalDiffs] = await Promise.all([uploadToImgur('modal'), uploadToImgur('banner')]).catch(e =>
        console.error(e)
    );

    if (bannerDiffs + modalDiffs > 0) {
        process.exit(1);
    }
})();
console.groupEnd();
