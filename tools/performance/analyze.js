const fs = require('fs');

const componentsReport = fs.readFileSync('../../dist/componentsReport.json');
const messagesReport = fs.readFileSync('../../dist/messagesReport.json');
const messagingCompReport = fs.readFileSync('../../dist/messagingCompReport.json');
const metricsReport = fs.readFileSync('../../dist/metrics.json');

if (!fs.existsSync('../../dist/componentsReport.json')) {
    console.error('Please run "npm run benchmark" first.');
    process.exit();
}

const headings = `<tr><td>Name</td><td>Unzipped</td><td>Gzipped</td></tr>`;

// Node Modules
// console.log('largest npm', messagesReport[0].groups[0].groups[0].label);

// Messaging Size
// console.log(messagingCompReport);
const messaging = `<tr><td>${messagingCompReport[0].label}</td><td>${messagingCompReport[0].parsedSize}</td><td>${messagingCompReport[0].gzipSize}</td></tr>`;

// Modals Sizes
// console.log(componentsReport);
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
// console.log(largestFiles);

// Speed Metrics and Network Requests
console.log(metricsReport);
const largestRequests = metricsReport.largestRequests
    .map(files => `<tr><td>${files.url}</td><td>${files.parsedSize}</td><td>${files.gzipSize}</td></tr>`)
    .join('');
const networkRequests = metricsReport.networkRequests
    .map(files => `<tr><td>${files.url}</td><td>${files.speed}</td>`)
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
html += headings;
html += `<tr><td>Total Requests</td><td>${metricsReport.total_requests}</td></tr>`;
html += `<tr><td>total_download_gzipped</td><td>${metricsReport.total_download_gzipped}</td></tr>`;
html += `<tr><td>total_download_unzipped</td><td>${metricsReport.total_download_unzipped}</td></tr>`;
html += `<tr><td>total_upload</td><td>${metricsReport.total_upload}</td></tr>`;
html += `<tr><td>first_render_delay</td><td>${metricsReport.first_render_delay}</td></tr>`;
html += `<tr><td>render_duration</td><td>${metricsReport.render_duration}</td></tr>`;
html += largestRequests;
html += networkRequests;

html += `</table>`;

// html += `<code>${JSON.stringify([messagesReport[0].groups[0].groups[0], ...messagingCompReport, ...componentsReport, metricsReport])}<code>`
html += `</body></html>`;

fs.writeFile('../../dist/performanceData.html', html, console.log);
