// const isComparingSnapshots = process.env.DIRTY_SNAPSHOTS == 0; // eslint-disable-line eqeqeq

// Outputs current test so CI does not stall
const logTestName = ({ account, viewport, groupString, testNameParts, testName }) => {
    const name = testName || `${account} ${groupString} ${testNameParts}`;
    // eslint-disable-next-line no-constant-condition
    if (false) {
        // eslint-disable-next-line no-console
        console.log(`Running test [${name}] with viewport [${JSON.stringify(viewport)}]`);
    }
};

export default logTestName;
