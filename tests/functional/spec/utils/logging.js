// to enable, set TEST_DEBUG in the CI or local environment
export const logTestName = ({ account, viewport, groupString, testNameParts, testName }) => {
    const name = testName || `${account} ${groupString} ${testNameParts}`;

    if (process.env.TEST_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`Running test [${name}] with viewport [${JSON.stringify(viewport)}]`);
    }
};

export const logScreenshot = ({ name, viewport }) => {
    if (process.env.TEST_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`Taking screenshot of [${name}] with dimensions ${JSON.stringify(viewport)}`);
    }
};
