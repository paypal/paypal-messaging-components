const fs = require('fs');

const basePath = process.cwd();

/**
 * Get lighthouse files inside of lighthouse directory if it exists
 * @returns {Promise} - array of lighthouse files names
 */
const checkDirectory = () => {
    return new Promise(resolve => {
        fs.readdir(`${basePath}/lighthouse`, { encoding: 'utf8' }, (err, file) => {
            if (err) {
                resolve([]);
            }
            resolve(file);
        });
    });
};

/**
 * Read raw lighthouse json files and organize by url and seperate desktop and mobile
 * @param {array} files - array of file names
 * @returns {object} - desktop and mobile scores grouped by url
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
 * Get average score of most recent lighthouse scores (excludes the warm up run)
 * @param {array} scores - array of site score objects
 * @param {string} page - url
 * @returns {object} - scores for page
 */
const getSortedAverageScores = (scores, page) => {
    const timeSorted = scores.sort((a, b) => a.fetchTime - b.fetchTime).slice(1);

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
 * Turns array of page scores into one averaged score per page
 * @param {array} desktopLighthouseScores - all scores for each desktop page
 * @param {array} mobileLighthouseScores - all scores for each mobile page
 * @returns {object} - desktop and mobile averaged score for each page
 */
const getScores = (desktopLighthouseScores, mobileLighthouseScores) => {
    const desktopAverageScores = {};
    const mobileAverageScores = {};

    Object.entries(desktopLighthouseScores).forEach(page => {
        const url = page[0];
        desktopAverageScores[url] = getSortedAverageScores(desktopLighthouseScores[url], url);
        mobileAverageScores[url] = getSortedAverageScores(mobileLighthouseScores[url], url);
    });

    return { desktopAverageScores, mobileAverageScores };
};

/**
 * Create the html from the scores
 * @param {object} desktopAverageScores - pages with averaged scores
 * @param {object} mobileAverageScores - pages with averaged scores
 * @returns {string} - html
 */
const createLighthouseHtml = (desktopAverageScores, mobileAverageScores) => {
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

    return html;
};

/**
 * Save the html to a json file
 * @param {string} html
 * @param {boolean} empty - whether there were any lighthouse files to score
 */
const outputLighthouseJson = (html, empty = false) => {
    fs.writeFile('dist/lighthouseScores.json', JSON.stringify({ html: `${empty ? html : ''}` }), err => {
        if (err) {
            console.log('lighthouseScores.json failed to save');
            console.log(err);
        } else {
            console.log('lighthouseScores.json saved');
        }
    });
};

Promise.resolve(checkDirectory()).then(files => {
    const { desktopScores, mobileScores } = groupScores(files);
    const { desktopAverageScores, mobileAverageScores } = getScores(desktopScores, mobileScores);
    // create html for lighthouse scores and save to json file for compile.js
    outputLighthouseJson(createLighthouseHtml(desktopAverageScores, mobileAverageScores), files.length);
});
