const fs = require('fs');

const basePath = process.cwd();

/**
 *
 * @returns
 */
const checkDirectory = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(`${basePath}/lighthouse`, { encoding: 'utf8' }, (err, file) => {
            if (err) {
                reject(err);
            }
            resolve(file);
        });
    });
};

/**
 *
 * @param {*} files
 * @returns
 */
const groupScores = files => {
    const desktopScores = {};
    const mobileScores = {};

    files.forEach(file => {
        if (file.indexOf('json') !== -1 && file.indexOf('desktop-report') !== -1) {
            const lighthouseReport = JSON.parse(
                fs.readFileSync(`${basePath}/lighthouse/${file}`, { encoding: 'utf8' })
            );
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
            const lighthouseReport = JSON.parse(
                fs.readFileSync(`${basePath}/lighthouse/${file}`, { encoding: 'utf8' })
            );
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

    return { desktopScores, mobileScores };
};

/**
 *
 * @param {*} scores
 * @param {*} page
 * @returns
 */
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

    const count = timeSorted.length;
    return {
        url: page,
        performance: averageTimes.performance / count,
        accessibility: averageTimes.accessibility / count,
        bestPractices: averageTimes.bestPractices / count,
        seo: averageTimes.seo / count
    };
};

/**
 *
 * @param {*} desktopLighthouseScores
 * @param {*} mobileLighthouseScores
 */
const getAverages = (desktopLighthouseScores, mobileLighthouseScores) => {
    const desktopAverageScores = {};
    const mobileAverageScores = {};

    Object.keys(desktopLighthouseScores).forEach(page => {
        desktopAverageScores[page] = getTimeSortedAverageScores(desktopLighthouseScores, page);
    });

    Object.keys(mobileLighthouseScores).forEach(page => {
        mobileAverageScores[page] = getTimeSortedAverageScores(mobileLighthouseScores, page);
    });

    return { desktopAverageScores, mobileAverageScores };
};

/**
 *
 * @param {*} param0
 * @returns
 */
const createLighthouseHtml = ({ desktopAverageScores, mobileAverageScores }) => {
    const lighthouseHeadings = `<tr><td>URL</td><td>Performance</td><td>Accessibility</td><td>Best Practices</td><td>SEO</td></tr>`;

    const desktopLighthouse = Object.keys(desktopAverageScores)
        .map(
            score =>
                `<tr>
                    <td>${score}</td>
                    <td>${desktopAverageScores[score].performance.toFixed(3)}</td>
                    <td>${desktopAverageScores[score].accessibility.toFixed(3)}</td>
                    <td>${desktopAverageScores[score].bestPractices.toFixed(3)}</td>
                    <td>${desktopAverageScores[score].seo.toFixed(3)}</td>
                </tr>`
        )
        .join('');

    const mobileLighthouse = Object.keys(mobileAverageScores)
        .map(
            score =>
                `<tr>
                    <td>${score}</td>
                    <td>${mobileAverageScores[score].performance.toFixed(3)}</td>
                    <td>${mobileAverageScores[score].accessibility.toFixed(3)}</td>
                    <td>${mobileAverageScores[score].bestPractices.toFixed(3)}</td>
                    <td>${mobileAverageScores[score].seo.toFixed(3)}</td>
                </tr>`
        )
        .join('');

    let html = `<h2>Lighthouse Scores</h2>`;
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

    fs.writeFile('dist/lighthouseScores.json', `${html}`, err => {
        if (err) {
            console.log('lighthouseScores.json failed to save');
            console.log(err);
        } else {
            console.log('lighthouseScores.json saved');
        }
    });

    return html;
};

Promise.resolve(checkDirectory()).then(files => {
    const { desktopScores, mobileScores } = groupScores(files);
    const { desktopAverageScores, mobileAverageScores } = getAverages(desktopScores, mobileScores);
    createLighthouseHtml({ desktopAverageScores, mobileAverageScores });
});
