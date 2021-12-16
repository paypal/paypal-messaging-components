const fs = require('fs');

const basePath = process.cwd();

let html = `<html>
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
                    <div>${new Date().toDateString()}</div>`;
try {
    // get html from json files
    html += JSON.parse(fs.readFileSync(`${basePath}/dist/lighthouseScores.json`)).html;
    html += JSON.parse(fs.readFileSync(`${basePath}/dist/components.json`)).html;
    html += JSON.parse(fs.readFileSync(`${basePath}/dist/metrics.json`)).html;

    html += `</body></html>`;

    // output report html document
    fs.writeFile(`${basePath}/dist/performanceData${new Date().toISOString()}.html`, html, err => {
        if (err) {
            console.log('Error occured when writting performanceData.html');
        } else {
            console.log('performanceData.html created');
        }
    });
} catch (err) {
    throw new Error('Make sure lighthouse.json, components.json, and metrics.json exist first');
}
