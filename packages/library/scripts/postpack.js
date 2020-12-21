const path = require('path');
const fs = require('fs-extra');
const tar = require('tar');

const root = path.resolve(__dirname, '..');

// Cleanup the prepack script mutations by removing the altered 'src' directory
// and replacing it with the original files in the tar file
fs.remove(`${root}/src`).then(async () => {
    await tar.extract({ file: `${root}/src.bak.tar`, cwd: root });
    await fs.remove(`${root}/src.bak.tar`);
});
