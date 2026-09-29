const BaseEnvironment = require('jest-environment-puppeteer').default;

class StablePuppeteerEnvironment extends BaseEnvironment {
    async teardown() {
        try {
            await super.teardown();
        } catch (error) {
            const message = error && error.message ? error.message : '';

            // Puppeteer can attempt to close an already-destroyed target during teardown.
            // Ignore this known race so real test failures are not masked.
            if (message.includes('Target.closeTarget') && message.includes('No target with given id found')) {
                return;
            }

            throw error;
        }
    }
}

module.exports = StablePuppeteerEnvironment;
