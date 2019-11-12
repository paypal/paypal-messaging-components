const ezpaybanner = require('../../pages/EZpaybanner');

describe('EZpay bannertest', () => {
    it('Ezpaybanner', async function() {
        const { nemo } = this;
        await nemo.driver.sleep(5000);
        await nemo.driver.get(nemo.data.baseurl);
        await nemo.driver.sleep(5000);
        await nemo.driver
            .manage()
            .window()
            .maximize();
        await nemo.driver.sleep(5000);
        await ezpaybanner.ezpayentrypage(nemo).ezpaycollectiveEntry({});
        await nemo.driver.sleep(5000);
    });
});
