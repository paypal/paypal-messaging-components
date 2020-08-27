const path = require('path');
const fs = require('fs');
const readline = require('readline');

const OUTPUT_LOG = path.resolve(__dirname, '../../../test_output.log');
// const OUTPUT_LOG = path.resolve(__dirname, '../../../test_payload.log');
const SUMMARY_START = 'Test Suites:';
const FILE_FAIL_START = 'FAIL';
const FILE_FAIL_END = 'failed';
const TEST_SUCCESS_SYMBOL = '✓';
const TEST_FAIL_SYMBOL = '✕';

console.info({ OUTPUT_LOG });

const isSuiteStart = line => !line.includes(TEST_SUCCESS_SYMBOL) && !line.includes(TEST_FAIL_SYMBOL);

const collectFailedTests = async () => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(OUTPUT_LOG),
        output: null,
        console: false
    });

    let isInFile = false;
    let isInSuite = false;
    let isInSummary = false;
    let fileIndex = 0;
    const files = [];
    let summary = '';
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of readInterface) {
        if (line.includes(FILE_FAIL_START)) {
            isInFile = true;
            files.push({ startLine: line, suites: [], suiteIndex: 0 });
        } else if (isInFile && (line.includes(FILE_FAIL_END) || line.length === 0)) {
            const file = files[fileIndex];
            file.endLine = line;
            isInFile = false;
            fileIndex = files.length;
        } else if (line.includes(SUMMARY_START)) {
            isInFile = false;
            isInSummary = true;
        } else if (isInFile && line.length > 0) {
            const file = files[fileIndex];
            if (isSuiteStart(line)) {
                isInSuite = true;
                file.suiteIndex = file.suites.length;
                file.suites.push({ startLine: line, tests: [] });
            } else if (isInSuite) {
                const suite = file.suites[file.suiteIndex];
                if (line.includes(TEST_FAIL_SYMBOL)) {
                    suite.tests.push(line);
                }
            }
        }

        if (isInSummary) {
            summary += `${line}\n`;
        }
    }

    console.info('');
    files.forEach(file => {
        console.info(file.startLine);
        file.suites.forEach(suite => {
            console.info(suite.startLine);
            if (suite.tests.length) {
                suite.tests.forEach(test => {
                    console.info(test);
                });
            }
        });
        console.info(file.endLine || '');
    });
    console.info(`\n${summary}`);
};

collectFailedTests();
