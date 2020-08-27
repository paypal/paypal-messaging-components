const path = require('path');
const fs = require('fs');
const readline = require('readline');
const imgur = require('imgur');

const DIFF_FOLDER = '__diff_output__';
const DIFF_DIR = path.resolve(__dirname, `../${DIFF_FOLDER}`);
const DIFF_FOLDERS_LIST = path.resolve(__dirname, '../../../diff_folders.log');

const collectDiffs = async () => {
    const snapshotPath = path.resolve(__dirname, '../snapshots');

    fs.mkdirSync(DIFF_DIR);
    fs.mkdirSync(path.resolve(DIFF_DIR, 'modal'));
    fs.mkdirSync(path.resolve(DIFF_DIR, 'banner'));

    const readInterface = readline.createInterface({
        input: fs.createReadStream(DIFF_FOLDERS_LIST),
        output: null,
        console: false
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const fullPath of readInterface) {
        const contents = fs.readdirSync(fullPath);
        contents.forEach(name => {
            const file = path.resolve(fullPath, name);
            const configName = path
                .relative(snapshotPath, fullPath.replace(DIFF_FOLDER, ''))
                .replace(/:/g, '-')
                .replace(/\//g, '__');

            const subDir = file.includes('/modal/') ? 'modal' : 'banner';
            const newFile = path.resolve(DIFF_DIR, subDir, `${configName}__${name}`);
            console.info(`Mv: ${file}\n  To: ${newFile}`);
            fs.renameSync(file, newFile);
        });
    }
};

const uploadToImgur = async subDir => {
    const folder = path.resolve(DIFF_DIR, subDir);
    const snapshots = fs.readdirSync(folder);

    console.info(`SNAPSHOTS for ${subDir}`);
    console.info(snapshots.length ? `  ${snapshots.join('\n  ')}` : `None found`);

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
};

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
