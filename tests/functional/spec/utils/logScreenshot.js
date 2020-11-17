// to enable, set TEST_DEBUG in the CI or local environment
const logScreenshot = ({ name, viewport }) => {
    if (process.env.TEST_DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`Taking screenshot of [${name}] with dimensions ${JSON.stringify(viewport)}`);
    }
};

export default logScreenshot;
