const isComparingSnapshots = process.env.DIRTY_SNAPSHOTS == 0; // eslint-disable-line eqeqeq

const logTestName = ({ account, viewport, groupString, testNameParts }) => {
    if (isComparingSnapshots) {
        // eslint-disable-next-line no-console
        console.log(
            `Running test [${account} ${groupString} ${testNameParts}] with viewport [${JSON.stringify(viewport)}]`
        );
    }
};

export default logTestName;
