const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    // Get the network requests
    page.setRequestInterception(true);
    // Watch for request event
    const stats = {
        total_requests: 0,
        total_download_gzipped: 0,
        total_download_unzipped: 0,
        // Total Upload
        // Log largest offending requests
        // Capturing of network requests should occur up to the first messaging /log request
        // Request speed for each network request
        first_render_delay: null,
        render_duration: null
    };

    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().indexOf('paypal') > -1) {
            // console.log(interceptedRequest.url())
            // console.log(interceptedRequest)
            stats.total_requests += 1;
        }

        // Get log request with first_render_delay and render_duration
        if (interceptedRequest.url().indexOf('credit-presentment/log') > -1) {
            const { tracking } = JSON.parse(interceptedRequest._postData);

            tracking.forEach(row => {
                if (row.first_render_delay) {
                    stats.first_render_delay = row.first_render_delay;
                }
                if (row.render_duration) {
                    stats.render_duration = row.render_duration;
                }
            });

            // console.log(interceptedRequest);
            // console.log(stats);
        } else {
            interceptedRequest.continue();
        }
    });

    // page.on('Network.responseReceived', ({ response }) => {
    //     console.log('responseReceived', [response.headers['Content-Length'], response.encodedDataLength]);
    // });

    await page.goto('https://localhost.paypal.com:8080/standalone.html', {
        waitUntil: 'networkidle2'
    });

    // Wait for long enough for log request for fire
    // THERE IS PROBABLY A BETTER WAY TO DO THIS
    await page.waitFor(20000);

    await browser.close();
    await process.exit();
})();
