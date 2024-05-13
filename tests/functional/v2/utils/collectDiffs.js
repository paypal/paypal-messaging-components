const pathPackage = require('path');
const fs = require('fs');
const readline = require('readline');
const imgur = require('imgur');

const DIFF_FOLDER = '__diff_output__';
const DIFF_DIR = pathPackage.resolve(__dirname, `../${DIFF_FOLDER}`);
const DIFF_FOLDERS_LIST = pathPackage.resolve(__dirname, '../../../../diff_folders.log');
const SNAPSHOT_PATH = pathPackage.resolve(__dirname, '../snapshots');

const renameFile = async ({ folderPath, fileName }) => {
    const oldPath = pathPackage.resolve(folderPath, fileName);
    // {snapshotType}/{integrationType}/{locale}/{account}/{screenSize}
    const relativePath = pathPackage.relative(SNAPSHOT_PATH, folderPath.replace(DIFF_FOLDER, ''));
    // {integrationType}__{locale}__{account}__{screenSize}
    const configName = relativePath.replace(/^(modal|banner)\//, '').replace(/\//g, '__');

    const subDir = oldPath.includes('/modal/') ? 'modal' : 'banner';
    const newPath = pathPackage.resolve(DIFF_DIR, subDir, `${configName}__${fileName}`);
    fs.renameSync(oldPath, newPath);

    const shortPath = oldPath.slice(oldPath.indexOf('snapshots/'));
    const shortNewPath = newPath.slice(newPath.indexOf(DIFF_FOLDER));
    console.info(`Mv: ${shortPath}\nTo: ${shortNewPath}\n`); // eslint-disable-line no-console
};

// Move all snapshot diffs to tests/function/v2/__diff_output__ under banner/ or modal/
const collectDiffs = async () => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(DIFF_FOLDERS_LIST),
        output: null,
        console: false
    });

    console.group('COLLECTING DIFFS'); // eslint-disable-line no-console
    // eslint-disable-next-line no-restricted-syntax
    for await (const folderPath of readInterface) {
        const contents = fs.readdirSync(folderPath);

        console.group(`MOVING ${contents.length} SNAPSHOTS in ${folderPath}`); // eslint-disable-line no-console
        if (contents.length) console.info(contents.join('\n'), '\n'); // eslint-disable-line no-console

        contents.forEach(fileName => {
            renameFile({ folderPath, fileName });
        });

        console.groupEnd(); // eslint-disable-line no-console
    }
    console.groupEnd(); // eslint-disable-line no-console
};

const uploadToImgur = async subDir => {
    const folder = pathPackage.resolve(DIFF_DIR, subDir);
    const snapshots = fs.readdirSync(folder);

    console.group(`UPLOADING ${snapshots.length} SNAPSHOTS for ${subDir}`); // eslint-disable-line no-console
    console.info(snapshots.length ? `${snapshots.join('\n')}` : `None found`); // eslint-disable-line no-console
    console.groupEnd(); // eslint-disable-line no-console

    if (snapshots.length > 0) {
        const album = await imgur.createAlbum();

        const snapshotsArray = snapshots.map(fileName => `${folder}/${fileName}`);
        const result = await imgur.uploadImages(snapshotsArray, 'File', album.deletehash);

        const albumUrl = `https://imgur.com/a/${album.id}`;
        // eslint-disable-next-line no-console
        console.info(`\n\u001b[31m${result.length} failed ${subDir} snapshots uploaded and viewable at ${albumUrl}\n`);
    } else {
        console.info(`No snapshots found in ${folder}`); // eslint-disable-line no-console
    }

    return snapshots.length;
};

(async () => {
    await collectDiffs();

    const [bannerDiffs, modalDiffs] = await Promise.all([uploadToImgur('modal'), uploadToImgur('banner')]).catch(
        error => {
            console.error(error); // eslint-disable-line no-console
        }
    );

    if (bannerDiffs + modalDiffs > 0) {
        process.exit(1);
    }
})();
