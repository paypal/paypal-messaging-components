const puppeteer = require('puppeteer');
const fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

/**
 * Generate html from the metrics
 * @param {object} metricsReport - stats
 */
const createMetricsHtml = ({
    totalRequests,
    totalDownloadGzipped,
    totalDownloadUnzipped,
    totalUpload,
    firstRenderDelay,
    renderDuration,
    largestRequests,
    networkRequests
}) => {
    const largeNetworkheadings = `<tr><td>URL</td><td>Encoding</td><td>Size</td></tr>`;
    const speedHeadings = `<tr><td>URL</td><td>Time in Seconds</td></tr>`;

    // Speed Metrics and Network Requests
    const largestRequestsRow = largestRequests
        .map(files => `<tr><td><div>${files.url}</div></td><td>${files.encoding}</td><td>${files.size} bytes</td></tr>`)
        .join('');

    const networkRequestsRow = networkRequests
        .map(files => `<tr><td><div>${files.url.split('?')[0]}</div></td><td>${files.speed.toFixed(4)}</td>`)
        .join('');

    let html = `<h2>Network Requests</h2>`;
    html += `<table>`;
    html += `<tr><td>Total Requests</td><td>${totalRequests}</td></tr>`;
    html += `<tr><td>Total Download Gzipped</td><td>${totalDownloadGzipped} bytes</td></tr>`;
    html += `<tr><td>Total Download Unzipped</td><td>${totalDownloadUnzipped} bytes</td></tr>`;
    html += `<tr><td>Total Upload</td><td>${totalUpload} bytes</td></tr>`;
    html += `<tr><td>First Render Delay</td><td>${firstRenderDelay} ms</td></tr>`;
    html += `<tr><td>Render Duration</td><td>${renderDuration} ms</td></tr>`;
    html += `</table>`;

    html += `<h3>Largest Requests</h3>`;
    html += `<table>`;
    html += largeNetworkheadings;
    html += largestRequestsRow;
    html += `</table><br/>`;

    html += `<h3>All Network Requests</h3>`;
    html += `<table><br/>`;
    html += speedHeadings;
    html += networkRequestsRow;
    html += `</table>`;

    return html;
};

/**
 * Generate json from the metrics
 * @param {object} metricsReport - stats
 */
const createMetricsJson = metricsReport => {
    // stats has speed metric and network request data
    fs.writeFile('dist/metrics.json', JSON.stringify({ ...metricsReport }), err => {
        if (err) {
            console.log('metrics.json failed to save');
            console.log(err);
        } else {
            console.log('metrics.json saved');
        }
    });
};

// start puppeteer
const getMetrics = () =>
    setTimeout(
        async () => {
            const networkRequests = [];
            const stats = {
                totalRequests: 0,
                totalDownloadGzipped: 0,
                totalDownloadUnzipped: 0,
                totalUpload: 0,
                firstRenderDelay: null,
                renderDuration: null
            };
            const responseTimes = {};

            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: true,
                devtools: false,
                args: ['--no-sandbox']
            });

            const page = await browser.newPage();

            await page.setDefaultNavigationTimeout(0);

            // Listen to the network requests
            page.setRequestInterception(true);

            // Listen for requests and get request url and requestId to help match sizes
            page.on('request', async interceptedRequest => {
                performance.mark(JSON.stringify({ start: interceptedRequest.url() }));
                // Get log request with firstRenderDelay and renderDuration
                if (interceptedRequest.url().includes('credit-presentment/log') && interceptedRequest._postData) {
                    const { tracking } = JSON.parse(interceptedRequest._postData);
                    // look through each tracking request and fnd first render delay and renderDuration
                    tracking.forEach(row => {
                        if (row.first_render_delay) {
                            stats.firstRenderDelay = Number(row.first_render_delay);
                        }
                        if (row.render_duration) {
                            stats.renderDuration = Number(row.render_duration);
                        }
                    });
                }

                interceptedRequest.continue();
            });

            // Listen for responses and get speed
            page.on('response', async response => {
                // start tracking performance based on url
                performance.mark(JSON.stringify({ end: response.url() }));
                const obs = new PerformanceObserver((perfObserverList, observer) => {
                    perfObserverList.getEntries().forEach(row => {
                        // get name object and startTimes
                        const { name, startTime } = row;
                        // get name of mark for start and end
                        const { start, end } = JSON.parse(name);
                        // add the start and end times to an object with matching key names
                        if (start) {
                            if (!responseTimes[start]) {
                                responseTimes[start] = {};
                            }
                            responseTimes[start].start = startTime;
                        } else {
                            if (!responseTimes[end]) {
                                responseTimes[end] = {};
                            }
                            responseTimes[end].end = startTime;
                        }
                    });

                    observer.disconnect();
                });
                obs.observe({ entryTypes: ['mark'], buffered: true });
            });

            // Listen for when response received and get info about requests
            page._client.on('Network.responseReceived', requestReceived => {
                // requestReceived.response.encodedDataLength is inaccurate for gzipped but fine for upload size. Getting gzip size from performance function data instead
                // get base64 image size
                const stringLength = requestReceived.response.url.length - 'data:image/png;base64,'.length;
                const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1000;

                // remove gatsby build files
                if (requestReceived.response.url.indexOf('herokuapp') === -1) {
                    // get network requests
                    networkRequests.push({
                        url: requestReceived.response.url,
                        speed: requestReceived.response.timing
                            ? requestReceived.timestamp - requestReceived.response.timing.requestTime
                            : 0,
                        encoding:
                            (requestReceived.response.headersText &&
                                requestReceived.response.headersText.includes('Content-Encoding')) ||
                            (requestReceived.response.headersText &&
                                requestReceived.response.headersText.includes('content-encoding')) ||
                            (requestReceived.response.headers &&
                                requestReceived.response.headers['Content-Encoding']) ||
                            (requestReceived.response.headers && requestReceived.response.headers['content-encoding'])
                                ? 'gzip'
                                : 'unzipped',
                        size:
                            Number(requestReceived.response.headers['content-length']) ||
                            Number(requestReceived.response.headers['Content-Length']) ||
                            requestReceived.response.encodedDataLength ||
                            sizeInKb,
                        download:
                            (requestReceived.response.headersText &&
                                requestReceived.response.headersText.includes('Content-Encoding: gzip')) ||
                            Boolean(Number(requestReceived.response.headers['content-length'])) ||
                            Boolean(Number(requestReceived.response.headers['Content-Length']))
                    });
                }
            });

            // go to localhost standalone or requested metrics_url with the supplied stage tag
            await page.goto(
                `https://${process.env.METRICS_URL || 'localhost.paypal.com:8080/standalone.html'}?env=stage${
                    process.env.STAGE_TAG ? `&stageTag=${process.env.STAGE_TAG}` : ''
                }`,
                {
                    waitUntil: 'networkidle2'
                }
            );

            // look for performance entries that the resource type
            const resourceMetrics = await page.evaluate(() => {
                return {
                    parentDocument: JSON.stringify(performance.getEntriesByType('resource'))
                };
            });

            // Wait for long enough for log request for fire
            await page.waitFor(10000).then(() => {
                const parentDocument = JSON.parse(resourceMetrics.parentDocument);
                networkRequests.forEach((requests, index) => {
                    // count total requests
                    stats.totalRequests += 1;
                    // calculate the speed
                    if (
                        !requests.speed &&
                        responseTimes[requests.url] &&
                        responseTimes[requests.url].start &&
                        responseTimes[requests.url].end
                    ) {
                        const { start, end } = responseTimes[requests.url];
                        networkRequests[index].speed = end - start;
                    }
                    // get size of gzip and unzipped downloads
                    if (requests.download) {
                        if (requests.encoding === 'gzip') {
                            [...parentDocument].forEach(performanceRequestData => {
                                if (requests.url === performanceRequestData.name) {
                                    networkRequests[index].size = performanceRequestData.encodedBodySize;
                                }
                            });
                            stats.totalDownloadGzipped += requests.size;
                        } else {
                            stats.totalDownloadUnzipped += requests.size;
                        }
                    } else {
                        stats.totalUpload += requests.size;
                    }
                });
                // sort largest requests
                const largestRequests = [...networkRequests].sort((a, b) => {
                    return b.size - a.size;
                });
                // take only top 3 largest requests
                stats.largestRequests = [...largestRequests].splice(0, 3);
                stats.networkRequests = [...networkRequests];
                // create html out of stats
                createMetricsJson(stats);
            });

            await browser.close();
            await process.exit();
        },
        process.env.METRICS_URL ? 0 : 30000
    );

if (process.env.BENCHMARK === 'true') {
    // need to wait for server to start in jenkins
    getMetrics();
}

module.exports = { createMetricsHtml };
