const selectors = {
    mainPage: '#container',
    noInterestOpen: '.message__content',
    noInterestClose: '#close-btn',
    iframe: 'xpath://div[contains(@style,"display: block")]//iframe',
    noInterestContainer: 'xpath://section[@id="modal-container"]',
    noInterestAccordion: 'xpath://section[@id="ni-content"]/div[2]/h3',
    payOvertimeAccordion: 'xpath://section[@id = "ni-content"]/div[4]/h3',
    paypalCreditAccordian: 'xpath://section[@id="ni-content"]/div[6]/h3',
    NIdiv: 'xpath://div[@data-pp-id="3"]'
};

exports.NIentrypage = function(nemo) {
    return {
        async viewNoInterestBanner() {
            await nemo.view._waitVisible(selectors.mainPage);
            await nemo.driver.switchTo().frame(1);
            await nemo.view._waitVisible(selectors.noInterestOpen);
            await nemo.view._find(selectors.noInterestOpen).click();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },

        async canOpenCloseNoInterestAccordion() {
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            await nemo.view._waitVisible(selectors.noInterestAccordion);
            await nemo.view._find(selectors.noInterestAccordion).click();
            const noInterestAccordion1 = await nemo.view._finds(selectors.noInterestAccordion);
            await nemo.driver.sleep(2000);
            await nemo.driver
                .actions()
                .mouseMove(noInterestAccordion1[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.sleep(2000);
        },

        async canOpenClosepayOvertimeAccordion() {
            await nemo.view._waitVisible(selectors.payOvertimeAccordion);
            await nemo.view._find(selectors.payOvertimeAccordion).click();
            const noInterestAccordion2 = await nemo.view._finds(selectors.payOvertimeAccordion);
            await nemo.driver.sleep(2000);
            await nemo.driver
                .actions()
                .mouseMove(noInterestAccordion2[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.sleep(2000);
        },
        async canOpenClosePaypalCreditAccordion() {
            await nemo.view._waitVisible(selectors.paypalCreditAccordian);
            await nemo.view._find(selectors.paypalCreditAccordian).click();
            const noInterestAccordion3 = await nemo.view._finds(selectors.paypalCreditAccordian);
            await nemo.driver.sleep(2000);
            await nemo.driver
                .actions()
                .mouseMove(noInterestAccordion3[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },
        async closeNoInterestBanner() {
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            await nemo.view._waitVisible(selectors.noInterestClose);
            await nemo.view._find(selectors.noInterestClose).click();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },
        async closesOnEscKey() {
            await this.viewNoInterestBanner();
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            await nemo.driver
                .actions()
                .sendKeys(nemo.wd.Key.ESCAPE)
                .perform();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },
        async closesOnOverlayClick() {
            await this.viewNoInterestBanner();
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            const container = await nemo.view._finds(selectors.noInterestContainer);
            await nemo.driver
                .actions()
                .mouseMove(container[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },
        async canReopenNoInterestBanner() {
            const NIstyle = await nemo.view._find(selectors.NIdiv).getAttribute('style');
            const NIdisplaystyle = await NIstyle.split(';');
            if (NIdisplaystyle[0] === 'display: none') {
                await this.viewNoInterestBanner();
                await this.closeNoInterestBanner();
            }
        },
        async NIcollectiveEntry() {
            await this.viewNoInterestBanner();
            await this.canOpenCloseNoInterestAccordion();
            await this.canOpenClosepayOvertimeAccordion();
            await this.canOpenClosePaypalCreditAccordion();
            await this.closeNoInterestBanner();
            await this.closesOnEscKey();
            await this.closesOnOverlayClick();
            await this.canReopenNoInterestBanner();
        }
    };
};
