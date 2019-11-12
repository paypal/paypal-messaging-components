const nibanner = require('../../pages/NIbanner');

describe('NI bannertest', () => {
    it('NIbanner', async function() {
        const { nemo } = this;
        await nemo.driver.sleep(5000);
        await nemo.driver.get(nemo.data.baseurl);
        await nemo.driver.sleep(5000);
        await nemo.driver
            .manage()
            .window()
            .maximize();
        await nemo.driver.sleep(5000);
        await nibanner.NIentrypage(nemo).NIcollectiveEntry({});
        await nemo.driver.sleep(5000);
    });
});
