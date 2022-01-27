// To enable functional test debug mode, set TEST_DEBUG in the CI or local environment.

/**
 * Logs test information when in functional test debug mode.
 */
export const logTestName = testNameParts => {
    if (process.env.TEST_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`Running test ${testNameParts}`);
    }
};

/**
 * Logs screenshot information when in functional test debug mode.
 */
export const logScreenshot = ({ name, viewport }) => {
    if (process.env.TEST_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`Taking screenshot of "${name}" with dimensions ${JSON.stringify(viewport)}`);
    }
};
