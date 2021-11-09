const fs = require('fs');

const basePath = process.cwd();

if (!fs.existsSync(`${basePath}/dist/componentsReport.json`)) {
    console.error('Please run "npm run benchmark" first.');
    process.exit();
}

const headings = `<tr><td>Name</td><td>Unzipped</td><td>Gzipped</td></tr>`;
const largeNetworkheadings = `<tr><td>URL</td><td>Encoding</td><td>Size</td></tr>`;
const speedHeadings = `<tr><td>URL</td><td>Time in Seconds</td></tr>`;
const lighthouseHeadings = `<tr><td>URL</td><td>Performance</td><td>Accessibility</td><td>Best Practices</td><td>SEO</td></tr>`;

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
</head><body>`;
html += `<div>${new Date().toDateString()}</div>`;

if (fs.existsSync(`${basePath}/dist/lighthouseScores.json`)) {
    const lightHouseReport = JSON.parse(
        fs.readFileSync(`${basePath}/dist/lighthouseScores.json`, { encoding: 'utf8' })
    );
    const { desktopAverageScores, mobileAverageScores } = lightHouseReport;

    const desktopLighthouse = Object.keys(desktopAverageScores)
        .map(
            score =>
                `<tr><td>${score}</td><td>${desktopAverageScores[score].performance.toFixed(
                    3
                )}</td><td>${desktopAverageScores[score].accessibility.toFixed(3)}</td><td>${desktopAverageScores[
                    score
                ].bestPractices.toFixed(3)}</td><td>${desktopAverageScores[score].seo.toFixed(3)}</td></tr>`
        )
        .join('');
    const mobileLighthouse = Object.keys(mobileAverageScores)
        .map(
            score =>
                `<tr><td>${score}</td><td>${mobileAverageScores[score].performance.toFixed(
                    3
                )}</td><td>${mobileAverageScores[score].accessibility.toFixed(3)}</td><td>${mobileAverageScores[
                    score
                ].bestPractices.toFixed(3)}</td><td>${mobileAverageScores[score].seo.toFixed(3)}</td></tr>`
        )
        .join('');

    html += `<h2>Lighthouse Scores</h2>`;
    html += `<h3>Desktop</h3>`;
    html += `<table>`;
    html += lighthouseHeadings;
    html += desktopLighthouse;
    html += `</table>`;
    html += `<h3>Mobile</h3>`;
    html += `<table>`;
    html += lighthouseHeadings;
    html += mobileLighthouse;
    html += `</table>`;
}

if (fs.existsSync(`${basePath}/dist/messagesReport.json`)) {
    const messagesReport = JSON.parse(fs.readFileSync(`${basePath}/dist/messagesReport.json`, { encoding: 'utf8' }));

    html += `<h2>NPM Modules</h2>`;
    html += `<table><tr><td>Largest</td><td>${messagesReport[0].groups[0].groups[0].label}</td><td>${messagesReport[0].groups[0].groups[0].parsedSize} bytes (unzipped)</td></tr></table>`;
}

if (fs.existsSync(`${basePath}/dist/componentsReport.json`)) {
    const messagingCompReport = JSON.parse(
        fs.readFileSync(`${basePath}/dist/messagingCompReport.json`, { encoding: 'utf8' })
    );
    const componentsReport = JSON.parse(
        fs.readFileSync(`${basePath}/dist/componentsReport.json`, { encoding: 'utf8' })
    );
    // Messaging Size
    const messaging = `<tr><td>${messagingCompReport[0].label}</td><td>${messagingCompReport[0].parsedSize}</td><td>${messagingCompReport[0].gzipSize}</td></tr>`;

    // Modals Sizes
    const modals = componentsReport
        .map(
            modal =>
                `<tr><td>${modal.label}</td><td>${modal.parsedSize} bytes</td><td>${modal.gzipSize} bytes</td></tr>`
        )
        .join('');

    // Largest file sizes
    const largestFiles = [...componentsReport, ...messagingCompReport]
        .sort((a, b) => {
            return b.gzipSize - a.gzipSize;
        })
        .splice(0, 3)
        .map(
            files =>
                `<tr><td><div>${files.label}</div></td><td>${files.parsedSize} bytes</td><td>${files.gzipSize} bytes</td></tr>`
        )
        .join('');

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
}

if (fs.existsSync(`${basePath}/dist/metrics.json`)) {
    const metricsReport = JSON.parse(fs.readFileSync(`${basePath}/dist/metrics.json`, { encoding: 'utf8' }));
    // Speed Metrics and Network Requests
    const largestRequests = metricsReport.largestRequests
        .map(files => `<tr><td><div>${files.url}</div></td><td>${files.encoding}</td><td>${files.size} bytes</td></tr>`)
        .join('');

    const networkRequests = metricsReport.networkRequests
        .map(files => `<tr><td><div>${files.url.split('?')[0]}</div></td><td>${files.speed.toFixed(4)}</td>`)
        .join('');

    html += `<h2>Network Requests</h2>`;
    html += `<table>`;
    html += `<tr><td>Total Requests</td><td>${metricsReport.total_requests}</td></tr>`;
    html += `<tr><td>total_download_gzipped</td><td>${metricsReport.total_download_gzipped} bytes</td></tr>`;
    html += `<tr><td>total_download_unzipped</td><td>${metricsReport.total_download_unzipped} bytes</td></tr>`;
    html += `<tr><td>total_upload</td><td>${metricsReport.total_upload} bytes</td></tr>`;
    html += `<tr><td>first_render_delay</td><td>${metricsReport.first_render_delay} ms</td></tr>`;
    html += `<tr><td>render_duration</td><td>${metricsReport.render_duration} ms</td></tr>`;
    html += `</table>`;

    html += `<h3>Largest Requests</h3>`;
    html += `<table>`;
    html += largeNetworkheadings;
    html += largestRequests;
    html += `</table><br/>`;

    html += `<h3>All Network Requests</h3>`;
    html += `<table><br/>`;
    html += speedHeadings;
    html += networkRequests;
    html += `</table>`;
}

html += `</body></html>`;

fs.writeFile(`${basePath}/dist/performanceData${new Date().toISOString()}.html`, html, err => {
    if (err) {
        console.log('Error occured when writting performanceData.html');
    } else {
        console.log('performanceData.html created');
    }
});
