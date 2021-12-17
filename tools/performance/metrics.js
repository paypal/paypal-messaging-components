const puppeteer = require('puppeteer');
const fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

/**
 * Generate html from the metrics
 * @param {object} metricsReport - stats
 */
const createMetricsHtml = metricsReport => {
    const largeNetworkheadings = `<tr><td>URL</td><td>Encoding</td><td>Size</td></tr>`;
    const speedHeadings = `<tr><td>URL</td><td>Time in Seconds</td></tr>`;

    // Speed Metrics and Network Requests
    const largestRequests = metricsReport.largestRequests
        .map(files => `<tr><td><div>${files.url}</div></td><td>${files.encoding}</td><td>${files.size} bytes</td></tr>`)
        .join('');

    const networkRequests = metricsReport.networkRequests
        .map(files => `<tr><td><div>${files.url.split('?')[0]}</div></td><td>${files.speed.toFixed(4)}</td>`)
        .join('');

    let html = `<h2>Network Requests</h2>`;
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

    // stats has speed metric and network request data
    fs.writeFile('dist/metrics.json', JSON.stringify({ html: `${html}` }), err => {
        if (err) {
            console.log('metrics.json failed to save');
            console.log(err);
        } else {
            console.log('metrics.json saved');
        }
    });
};

// start puppeteer
const getMetrics = async () => {
    const networkRequests = [];
    const stats = {
        total_requests: 0,
        total_download_gzipped: 0,
        total_download_unzipped: 0,
        total_upload: 0,
        first_render_delay: null,
        render_duration: null
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
        // Get log request with first_render_delay and render_duration
        if (interceptedRequest.url().includes('credit-presentment/log') && interceptedRequest._postData) {
            const { tracking } = JSON.parse(interceptedRequest._postData);
            // look through each tracking request and fnd first render delay and render_duration
            tracking.forEach(row => {
                if (row.first_render_delay) {
                    stats.first_render_delay = Number(row.first_render_delay);
                }
                if (row.render_duration) {
                    stats.render_duration = Number(row.render_duration);
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
                    (requestReceived.response.headers && requestReceived.response.headers['Content-Encoding']) ||
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
            stats.total_requests += 1;
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
                    stats.total_download_gzipped += requests.size;
                } else {
                    stats.total_download_unzipped += requests.size;
                }
            } else {
                stats.total_upload += requests.size;
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
        createMetricsHtml(stats);
    });

    await browser.close();
    await process.exit();
};

if (process.env.BENCHMARK_METRICS === 'true') {
    getMetrics();
}
