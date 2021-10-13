const fs = require('fs');

const basePath = process.cwd();

if (!fs.existsSync(`${basePath}/dist/componentsReport.json`)) {
    console.error('Please run "npm run benchmark" first.');
    process.exit();
}

const componentsReport = JSON.parse(fs.readFileSync(`${basePath}/dist/componentsReport.json`, { encoding: 'utf8' }));
const messagesReport = JSON.parse(fs.readFileSync(`${basePath}/dist/messagesReport.json`, { encoding: 'utf8' }));
const messagingCompReport = JSON.parse(
    fs.readFileSync(`${basePath}/dist/messagingCompReport.json`, { encoding: 'utf8' })
);
const metricsReport = JSON.parse(fs.readFileSync(`${basePath}/dist/metrics.json`, { encoding: 'utf8' }));

const headings = `<tr><td>Name</td><td>Unzipped</td><td>Gzipped</td></tr>`;
const largeNetworkheadings = `<tr><td>URL</td><td>Encoding</td><td>Gzipped</td></tr>`;
const speedHeadings = `<tr><td>URL</td><td>Time in MS</td></tr>`;

// Node Modules
// console.log('largest npm', messagesReport[0].groups[0].groups[0].label);

// Messaging Size
const messaging = `<tr><td>${messagingCompReport[0].label}</td><td>${messagingCompReport[0].parsedSize}</td><td>${messagingCompReport[0].gzipSize}</td></tr>`;

// Modals Sizes
const modals = componentsReport
    .map(modal => `<tr><td>${modal.label}</td><td>${modal.parsedSize}</td><td>${modal.gzipSize}</td></tr>`)
    .join('');

// Largest file sizes
const largestFiles = [...componentsReport, ...messagingCompReport]
    .sort((a, b) => {
        return b.gzipSize - a.gzipSize;
    })
    .splice(0, 3)
    .map(files => `<tr><td>${files.label}</td><td>${files.parsedSize}</td><td>${files.gzipSize}</td></tr>`)
    .join('');

// Speed Metrics and Network Requests
const largestRequests = metricsReport.largestRequests
    .map(files => `<tr><td>${files.url}</td><td>${files.encoding}</td><td>${files.size}</td></tr>`)
    .join('');

const networkRequests = metricsReport.networkRequests
    .map(files => `<tr><td>${files.url.split('?')[0]}</td><td>${files.speed.toFixed(4)}</td>`)
    .join('');

let html = `<html>
<head>
<title>Performance Benchmark</title>
<style>td:first-of-type{min-width: 250px; padding-right: 0;}td{padding: 0.25rem 0.45rem; }</style>
</head><body>`;
html += `<div>${new Date().toDateString()}</div>`;

html += `<h2>NPM Modules</h2>`;
html += `<table><tr><td>Largest</td><td>${messagesReport[0].groups[0].groups[0].label}</td></tr></table>`;

html += `<h2>File Sizes</h2><span>File sizes in bytes<span>`;

html += `<table>`;
html += headings;
html += messaging;
html += modals;
html += `</table>`;

html += `<h2>Largest Files</h2><span>File sizes in bytes<span>`;

html += `<table>`;
html += headings;
html += largestFiles;
html += `</table>`;

html += `<h2>Network Requests</h2><span>File sizes in bytes<span>`;
html += `<table>`;
html += `<tr><td>Total Requests</td><td>${metricsReport.total_requests}</td></tr>`;
html += `<tr><td>total_download_gzipped</td><td>${metricsReport.total_download_gzipped}</td></tr>`;
html += `<tr><td>total_download_unzipped</td><td>${metricsReport.total_download_unzipped}</td></tr>`;
html += `<tr><td>total_upload</td><td>${metricsReport.total_upload}</td></tr>`;
html += `<tr><td>first_render_delay</td><td>${metricsReport.first_render_delay}</td></tr>`;
html += `<tr><td>render_duration</td><td>${metricsReport.render_duration}</td></tr>`;
html += `</table>`;

html += `<h3>Largest Requests</h3><span>File sizes in bytes<span>`;
html += `<table>`;
html += largeNetworkheadings;
html += largestRequests;
html += `</table><br/>`;

html += `<h3>All Network Requests</h3>`;
html += `<table><br/>`;
html += speedHeadings;
html += networkRequests;
html += `</table>`;

// raw output to long. need to remove internal packages from all first to use
// html += `<code>${JSON.stringify([messagesReport[0].groups[0].groups[0], ...messagingCompReport, ...componentsReport, metricsReport])}<code>`
html += `</body></html>`;

fs.writeFile(`${basePath}/dist/performanceData${new Date().toISOString()}.html`, html, err => {
    if (err) {
        console.log('Error occured when writting performanceData.html');
    } else {
        console.log('performanceData.html created');
    }
});
