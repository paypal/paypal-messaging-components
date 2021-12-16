const fs = require('fs');

const basePath = process.cwd();

/**
 * Get the json data for the analyzed bundles
 * @param {string} file - file name
 * @returns {promise} - array of objects
 */
const getComponentFileData = file => {
    return new Promise(resolve => {
        fs.readFile(`${basePath}/dist/${file}.json`, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                resolve([]);
            }

            resolve(
                JSON.parse(data).map(row => ({
                    label: row.label,
                    parsedSize: row.parsedSize,
                    gzipSize: row.gzipSize,
                    groups: row.groups
                }))
            );
        });
    });
};

/**
 * Create an array of promises for the bundle data
 * @returns {array} - array of promises
 */
const getComponentJson = () => {
    return [getComponentFileData('messagesReport'), getComponentFileData('componentsReport')];
};

/**
 * Create HTML table row
 * @param {array} jsonDataArray - each row is a file object
 * @returns {string} - HTML table rows
 */
const getFileSizeTableRowHtml = jsonDataArray => {
    return jsonDataArray
        .map(row => `<tr><td>${row.label}</td><td>${row.parsedSize} bytes</td><td>${row.gzipSize} bytes</td></tr>`)
        .join('');
};

/**
 * Create HTML for all components
 * @param {array} messagesReport - bundle data for messages
 * @param {array} componentsReport - bundle data for components
 * @returns {string} - html for all components
 */
const getComponentHtml = (messagesReport, componentsReport) => {
    const headings = `<tr><td>Name</td><td>Unzipped</td><td>Gzipped</td></tr>`;
    let html = `<h2>NPM Modules</h2>`;
    html += `<table><tr><td>Largest</td><td>${messagesReport[0].groups[0].groups[0].label}</td><td>${messagesReport[0].groups[0].groups[0].parsedSize} bytes (unzipped)</td></tr></table>`;

    // Messaging Size
    const messaging = getFileSizeTableRowHtml(messagesReport);

    // Modals Sizes
    const modals = getFileSizeTableRowHtml(componentsReport);

    // Largest file sizes
    const largestFiles = getFileSizeTableRowHtml(
        [...componentsReport, ...messagesReport].sort((a, b) => b.gzipSize - a.gzipSize).splice(0, 3)
    );

    html += `<h2>File Sizes</h2>`;
    html += `<table>`;
    html += headings;
    html += messaging;
    html += modals;
    html += `</table>`;

    html += `<h2>Largest Files</h2>`;

    html += `<table>`;
    html += headings;
    html += largestFiles;
    html += `</table>`;

    return html;
};

Promise.all(getComponentJson()).then(reports => {
    const [messagesReport, componentsReport] = reports;
    const html = getComponentHtml(messagesReport, componentsReport);

    // save html to json file to be used in compile.js
    fs.writeFile('dist/components.json', JSON.stringify({ html: `${html}` }), err => {
        if (err) {
            console.log('components.json failed to save');
            console.log(err);
        } else {
            console.log('components.json saved');
        }
    });
});
