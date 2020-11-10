const path = require('path');
const fs = require('fs');
const semver = require('semver');

const libraryPackageJson = require('../../packages/library/package.json');
const dependencies = require('../../dist/bizcomponents/meta.json');

const PACKAGE_DIR = path.resolve(__dirname, '../../packages');

const packages = fs.readdirSync(PACKAGE_DIR, { withFileTypes: true }).reduce((acc, dirent) => {
    if (!dirent.isDirectory()) return acc;

    const { name, version } = JSON.parse(fs.readFileSync(`${PACKAGE_DIR}/${dirent.name}/package.json`));

    // Add new versions to each bundle version list
    if (!dependencies.bundles[name].versions.includes(version)) {
        dependencies.bundles[name].versions.unshift(version);
    }

    return {
        ...acc,
        [name]: version
    };
}, {});

Object.entries(libraryPackageJson.localDependencies).forEach(([packageName, range]) => {
    const latestVersion = packages[packageName];

    if (!semver.satisfies(latestVersion, range)) {
        libraryPackageJson.localDependencies[packageName] = `^${latestVersion}`;
    }
});

// dependencies.bundles[libraryPackageJson.name].dependencies[libraryPackageJson.version] =
//     libraryPackageJson.localDependencies;

fs.writeFileSync(
    path.resolve(__dirname, '../../packages/library/package.json'),
    JSON.stringify(libraryPackageJson, null, 4)
);

fs.writeFileSync(path.resolve(__dirname, '../../dist/bizcomponents/meta.json'), JSON.stringify(dependencies, null, 4));
