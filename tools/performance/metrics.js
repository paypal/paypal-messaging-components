const puppeteer = require('puppeteer');
const fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

setTimeout(
    async () => {
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
            // executablePath: process.env.puppeteerPath || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            ignoreHTTPSErrors: true,
            devtools: false,
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();

        // Get the network requests
        page.setRequestInterception(true);

        // get request url and requestId to help match sizes
        page.on('request', async interceptedRequest => {
            performance.mark(JSON.stringify({ start: interceptedRequest.url() }));
            // Get log request with first_render_delay and render_duration
            if (interceptedRequest.url().includes('credit-presentment/log') && interceptedRequest._postData) {
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

        page.on('response', async response => {
            performance.mark(JSON.stringify({ end: response.url() }));
            const obs = new PerformanceObserver((perfObserverList, observer) => {
                perfObserverList.getEntries().forEach(row => {
                    // get name object and startTimes
                    const { name, startTime } = row;
                    // get name of mark for start and end
                    const { start, end } = JSON.parse(name);

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

        page._client.on('Network.responseReceived', requestReceived => {
            // requestReceived.response.encodedDataLength is inaccurate for gzipped but fine for upload size. Getting gzip size from performance function data instead
            // get base64 image size
            const stringLength = requestReceived.response.url.length - 'data:image/png;base64,'.length;
            const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1000;

            // remove gatsby build files
            if (requestReceived.response.url.indexOf('herokuapp') === -1) {
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

        await page.goto(
            `https://${process.env.METRICS_URL || 'localhost.paypal.com:8080/standalone.html'}?env=stage${
                process.env.STAGE_TAG ? `&stageTag=${process.env.STAGE_TAG}` : ''
            }`,
            {
                waitUntil: 'networkidle2'
            }
        );

        const resourceMetrics = await page.evaluate(() => {
            return {
                parentDocument: JSON.stringify(performance.getEntriesByType('resource'))
            };
        });

        // Wait for long enough for log request for fire
        await page.waitFor(10000).then(() => {
            const parentDocument = JSON.parse(resourceMetrics.parentDocument);
            networkRequests.forEach((requests, index) => {
                stats.total_requests += 1;
                if (
                    !requests.speed &&
                    responseTimes[requests.url] &&
                    responseTimes[requests.url].start &&
                    responseTimes[requests.url].end
                ) {
                    const { start, end } = responseTimes[requests.url];
                    networkRequests[index].speed = end - start;
                }

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

            const largestRequests = [...networkRequests].sort((a, b) => {
                return b.size - a.size;
            });
            stats.largestRequests = [...largestRequests.splice(0, 3)];

            stats.networkRequests = [...networkRequests];

            // stats has speed metric and network request data
            fs.writeFile('dist/metrics.json', JSON.stringify(stats), err => {
                console.log(err);
            });
        });

        await browser.close();
        await process.exit();
    },
    process.env.METRICS_URL ? 0 : 30000
);
