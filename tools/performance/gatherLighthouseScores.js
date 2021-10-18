const fs = require('fs');

const basePath = process.cwd();
const lighthouseReports = {
    desktopReport: [],
    mobileReport: []
};
// look inside lighthouse folder for files
fs.readdirSync('lighthouse').forEach(file => {
    if (file.indexOf('json') !== -1 && file.indexOf('desktop-report') !== -1) {
        lighthouseReports.desktopReport.push(file);
    } else if (file.indexOf('json') !== -1 && file.indexOf('mobile-report') !== -1) {
        lighthouseReports.mobileReport.push(file);
    }
});

// create function for desktop and mobile
const desktopScores = {};
lighthouseReports.desktopReport.forEach(report => {
    const lighthouseReport = JSON.parse(fs.readFileSync(`${basePath}/lighthouse/${report}`, { encoding: 'utf8' }));
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
});

const mobileScores = {};
lighthouseReports.mobileReport.forEach(report => {
    const lighthouseReport = JSON.parse(fs.readFileSync(`${basePath}/lighthouse/${report}`, { encoding: 'utf8' }));
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
});

// console.log(desktopScores)
// console.log(mobileScores)

// const calcAverage = scores => {};

const getAverages = (desktopLighthouseScores, mobileLighthouseScores) => {
    const desktopAverageScores = {};
    const mobileAverageScores = {};

    Object.keys(desktopLighthouseScores).forEach(page => {
        const timeSorted = desktopLighthouseScores[page].sort((a, b) => a.fetchTime - b.fetchTime).slice(1);

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

        if (!desktopAverageScores[desktopLighthouseScores[page][0].url]) {
            desktopAverageScores[desktopLighthouseScores[page][0].url] = {
                url: desktopLighthouseScores[page][0].url
            };
        }

        desktopAverageScores[desktopLighthouseScores[page][0].url] = {
            performance: averageTimes.performance / timeSorted.length,
            accessibility: averageTimes.accessibility / timeSorted.length,
            bestPractices: averageTimes.bestPractices / timeSorted.length,
            seo: averageTimes.seo / timeSorted.length
        };
    });

    Object.keys(mobileLighthouseScores).forEach(page => {
        const timeSorted = mobileLighthouseScores[page].sort((a, b) => a.fetchTime - b.fetchTime).slice(1);

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

        if (!mobileAverageScores[mobileLighthouseScores[page][0].url]) {
            mobileAverageScores[mobileLighthouseScores[page][0].url] = {
                url: mobileLighthouseScores[page][0].url
            };
        }

        mobileAverageScores[mobileLighthouseScores[page][0].url] = {
            performance: averageTimes.performance / timeSorted.length,
            accessibility: averageTimes.accessibility / timeSorted.length,
            bestPractices: averageTimes.bestPractices / timeSorted.length,
            seo: averageTimes.seo / timeSorted.length
        };
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
