const path = require('path');
const fs = require('fs');
const readline = require('readline');

const OUTPUT_LOG = path.resolve(__dirname, '../../../test_output.log');
const SUMMARY_START = 'Test Suites:';
const SUITE_FAIL_START = 'FAIL';
const SUITE_FAIL_END = 'failed';
const TEST_SUCCESS_SYMBOL = '✓';

const collectFailedTests = () => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(OUTPUT_LOG),
        output: null,
        console: false
    });

    let isInSuite = false;
    let isInSummary = false;
    readInterface.on('line', line => {
        if (line.includes(SUITE_FAIL_START)) {
            isInSuite = true;
        }
        if (isInSuite && !line.includes(TEST_SUCCESS_SYMBOL)) {
            console.info(line);
        }
        if (line.includes(SUITE_FAIL_END)) {
            isInSuite = false;
        }

        if (line.includes(SUMMARY_START)) {
            isInSuite = false;
            isInSummary = true;
        }
        if (isInSummary) {
            console.info(line);
        }
    });
};

collectFailedTests();
