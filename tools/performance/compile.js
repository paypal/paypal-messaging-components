const fs = require('fs');

const { getComponentHtml } = require(`./components.js`);
const { createLighthouseHtml } = require(`./lighthouse.js`);
const { createMetricsHtml } = require(`./metrics.js`);
const basePath = process.cwd();

const writeHtmlToFile = html =>
    fs.writeFile(`${basePath}/dist/performanceData${new Date().toISOString()}.html`, html, err => {
        if (err) {
            console.log('Error occured when writting performanceData.html');
        } else {
            console.log('performanceData.html created');
        }
    });

const html = data => `<html>
    <head>
        <title>Performance Benchmark</title>
        <style>
            td:first-of-type {
                min-width: 250px; 
                max-width:500px; 
                overflow: auto;
                padding-right: 1rem;
            }
            td {
                padding: 0.25rem 0.45rem; 
            }
        </style>
    </head>
    <body>
        <div>${new Date().toDateString()}</div>
        ${createLighthouseHtml(data)}
        ${getComponentHtml(data)}
        ${createMetricsHtml(data)}
    </body>
</html>`;

try {
    const htmlJsonData = {
        ...JSON.parse(fs.readFileSync(`${basePath}/dist/lighthouseScores.json`)),
        ...JSON.parse(fs.readFileSync(`${basePath}/dist/components.json`)),
        ...JSON.parse(fs.readFileSync(`${basePath}/dist/metrics.json`))
    };

    writeHtmlToFile(html(htmlJsonData));
} catch (err) {
    console.log(err);
}
