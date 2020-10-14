const logTestName = ({ account, viewport, groupString, testNameParts }) => {
    // eslint-disable-next-line no-console
    console.log(
        `Running test [${account} ${groupString} ${testNameParts}] with viewport [${JSON.stringify(viewport)}]`
    );
};

export default logTestName;
