const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const networkRequests = [];
    const stats = {
        total_requests: 0,
        total_download_gzipped: 0,
        total_download_unzipped: 0,
        total_upload: 0,
        first_render_delay: null,
        render_duration: null
    };

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        ignoreHTTPSErrors: true,
        devtools: false
    });

    const page = await browser.newPage();

    // Get the network requests
    page.setRequestInterception(true);

    // get request url and requestId to help match sizes
    page.on('request', async interceptedRequest => {
        // Get log request with first_render_delay and render_duration
        if (interceptedRequest.url().includes('credit-presentment/log')) {
            const { tracking } = JSON.parse(interceptedRequest._postData);
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

    page._client.on('Network.responseReceived', requestReceived => {
        // requestReceived.response.encodedDataLength is inaccurate for gzipped but fine for upload size. Getting gzip size from performance function data instead
        networkRequests.push({
            url: requestReceived.response.url,
            speed: requestReceived.timestamp - requestReceived.response.timing.requestTime,
            encoding:
                requestReceived.response.headersText &&
                requestReceived.response.headersText.includes('Content-Encoding: gzip')
                    ? 'gzip'
                    : 'unzipped',
            size:
                Number(requestReceived.response.headers['content-length']) ||
                Number(requestReceived.response.headers['Content-Length']) ||
                requestReceived.response.encodedDataLength,
            download:
                (requestReceived.response.headersText &&
                    requestReceived.response.headersText.includes('Content-Encoding: gzip')) ||
                Boolean(Number(requestReceived.response.headers['content-length'])) ||
                Boolean(Number(requestReceived.response.headers['Content-Length']))
        });
    });

    await page.goto('https://localhost.paypal.com:8080/standalone.html', {
        waitUntil: 'networkidle2'
    });

    const resourceMetrics = await page.evaluate(() => {
        const iframe = document.querySelector('iframe');

        return {
            parentDocument: JSON.stringify(performance.getEntriesByType('resource')),
            iframe: JSON.stringify(iframe.contentWindow.performance.getEntriesByType('resource'))
        };
    });

    // Wait for long enough for log request for fire
    await page.waitFor(10000).then(() => {
        const parentDocument = JSON.parse(resourceMetrics.parentDocument);
        const iframe = JSON.parse(resourceMetrics.iframe);

        networkRequests.forEach((requests, index) => {
            stats.total_requests += 1;

            if (requests.download) {
                if (requests.encoding === 'gzip') {
                    [...parentDocument, ...iframe].forEach(performanceRequestData => {
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

        const largestRequests = networkRequests.sort((a, b) => {
            return b.size - a.size;
        });
        stats.largestRequests = [...largestRequests.splice(0, 3)];

        stats.networkRequests = networkRequests;

        // stats has speed metric and network request data
        fs.writeFile('dist/metrics.json', JSON.stringify(stats), err => {
            console.log(err);
        });
    });

    await browser.close();
    await process.exit();
})();
