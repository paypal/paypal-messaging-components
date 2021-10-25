const fs = require('fs');

const basePath = process.cwd();
// create function for desktop and mobile
const desktopScores = {};
const mobileScores = {};

// look inside lighthouse folder for files
fs.readdirSync('lighthouse').forEach(file => {
    if (file.indexOf('json') !== -1 && file.indexOf('desktop-report') !== -1) {
        const lighthouseReport = JSON.parse(fs.readFileSync(`${basePath}/lighthouse/${file}`, { encoding: 'utf8' }));
        if (!desktopScores[lighthouseReport.requestedUrl]) {
            desktopScores[lighthouseReport.requestedUrl] = [];
        }
        desktopScores[lighthouseReport.requestedUrl].push({
            url: lighthouseReport.requestedUrl,
            fetchTime: lighthouseReport.fetchTime,
            performance: lighthouseReport.categories.performance.score,
            accessibility: lighthouseReport.categories.accessibility.score,
            bestPractices: lighthouseReport.categories['best-practices'].score,
            seo: lighthouseReport.categories.seo.score
        });
    } else if (file.indexOf('json') !== -1 && file.indexOf('mobile-report') !== -1) {
        const lighthouseReport = JSON.parse(fs.readFileSync(`${basePath}/lighthouse/${file}`, { encoding: 'utf8' }));
        if (!mobileScores[lighthouseReport.requestedUrl]) {
            mobileScores[lighthouseReport.requestedUrl] = [];
        }
        mobileScores[lighthouseReport.requestedUrl].push({
            url: lighthouseReport.requestedUrl,
            fetchTime: lighthouseReport.fetchTime,
            performance: lighthouseReport.categories.performance.score,
            accessibility: lighthouseReport.categories.accessibility.score,
            bestPractices: lighthouseReport.categories['best-practices'].score,
            seo: lighthouseReport.categories.seo.score
        });
    }
});

const getTimeSortedAverageScores = (scores, page) => {
    const timeSorted = scores[page].sort((a, b) => a.fetchTime - b.fetchTime).slice(1);

    const averageTimes = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0
    };

    timeSorted.forEach(run => {
        averageTimes.performance += run.performance;
        averageTimes.accessibility += run.accessibility;
        averageTimes.bestPractices += run.bestPractices;
        averageTimes.seo += run.seo;
    });

    return {
        url: page,
        performance: averageTimes.performance / timeSorted.length,
        accessibility: averageTimes.accessibility / timeSorted.length,
        bestPractices: averageTimes.bestPractices / timeSorted.length,
        seo: averageTimes.seo / timeSorted.length
    };
};

const getAverages = (desktopLighthouseScores, mobileLighthouseScores) => {
    const desktopAverageScores = {};
    const mobileAverageScores = {};

    Object.keys(desktopLighthouseScores).forEach(page => {
        desktopAverageScores[desktopLighthouseScores[page][0].url] = getTimeSortedAverageScores(
            desktopLighthouseScores,
            page
        );
    });

    Object.keys(mobileLighthouseScores).forEach(page => {
        mobileAverageScores[mobileLighthouseScores[page][0].url] = getTimeSortedAverageScores(
            mobileLighthouseScores,
            page
        );
    });

    fs.writeFile('dist/lighthouseScores.json', JSON.stringify({ desktopAverageScores, mobileAverageScores }), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('lighthouseScores.json saved');
        }
    });
};

getAverages(desktopScores, mobileScores);
