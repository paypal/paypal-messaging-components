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

    console.group('COLLECTING DIFFS'); // eslint-disable-line no-console
    // eslint-disable-next-line no-restricted-syntax
    for await (const fullPath of readInterface) {
        const contents = fs.readdirSync(fullPath);

        console.group(`MOVING ${contents.length} SNAPSHOTS in ${fullPath}`); // eslint-disable-line no-console
        if (contents.length) console.info(contents.join('\n')); // eslint-disable-line no-console

        contents.forEach(name => {
            const file = path.resolve(fullPath, name);
            const configName = path
                .relative(snapshotPath, fullPath.replace(DIFF_FOLDER, ''))
                .replace(/:/g, '-')
                .replace(/\//g, '__');

            const subDir = file.includes('/modal/') ? 'modal' : 'banner';
            const newFile = path.resolve(DIFF_DIR, subDir, `${configName}__${name}`);
            const shortPath = file.slice(file.indexOf('snapshots/'));
            const shortNewPath = newFile.slice(file.indexOf(DIFF_FOLDER));
            console.info(`Mv: ${shortPath}\nTo: ${shortNewPath}`); // eslint-disable-line no-console
            fs.renameSync(file, newFile);
        });

        console.groupEnd(); // eslint-disable-line no-console
    }
    console.groupEnd(); // eslint-disable-line no-console
};

const uploadToImgur = async subDir => {
    const folder = path.resolve(DIFF_DIR, subDir);
    const snapshots = fs.readdirSync(folder);

    console.group(`UPLOADING ${snapshots.length} SNAPSHOTS for ${subDir}`); // eslint-disable-line no-console
    console.info(snapshots.length ? `${snapshots.join('\n')}` : `None found`); // eslint-disable-line no-console
    console.groupEnd(); // eslint-disable-line no-console

    if (snapshots.length > 0) {
        const album = await imgur.createAlbum();

        const snapshotsArray = snapshots.map(fileName => `${folder}/${fileName}`);
        const result = await imgur.uploadImages(snapshotsArray, 'File', album.data.deletehash);

        const albumUrl = `https://imgur.com/a/${album.data.id}`;
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
        error => console.error(error) // eslint-disable-line no-console
    );

    if (bannerDiffs + modalDiffs > 0) {
        process.exit(1);
    }
})();
