const selectors = {
    mainPage: '#container',
    ezPayOpen: '.message__content',
    ezCloseBanner: '#close-btn',
    iframe: 'xpath://div[contains(@style,"display: block")]//iframe',
    ezPayTextBox: '.calculator__input',
    ezPayCalculate: '.calculator__btn',
    ezPayContainer: 'xpath://section[@id="modal-container"]',
    ezPayAccordion: 'xpath://section[@id="ezp-content"]/div[4]/h3',
    ezPayPromotionAccordion: 'xpath://section[@id="ezp-content"]/div[6]/h3',
    ezPayMonthlyPayments: 'xpath://section[@id = "financing-terms"]/table/tbody/tr/td[1]',
    ezPayPayments: 'xpath://section[@id = "financing-terms"]table/tbody/tr/td[2]',
    ezPayMinimumPurchase: 'xpath://section[@id = "financing-terms"]/table/tbody/tr/td[2]',
    ezPayTotalInterest: 'xpath://section[@id = "financing-terms"]/table/tbody/tr/td[5]',
    ezPayTabClick: 'xpath://section[@id="tabs"]/h3[@id="ni-tab"]',
    noInterestTabClick: "xpath://section[@id='tabs']/h3[@id='ezp-tab']",
    ezPayTab: '#ezp-tab',
    noInterestTab: '#ni-tab',
    ezpContent: '#ezp-content',
    noInterestContent: '#ni-content',
    ezPayDiv: 'xpath://div[@data-pp-id="4"]'
};
const chai = require('chai');

chai.should();

exports.ezpayentrypage = function(nemo) {
    return {
        async viewEZPayBanner() {
            await nemo.view._waitVisible(selectors.mainPage);
            await nemo.driver.switchTo().frame(0);
            await nemo.view._waitVisible(selectors.ezPayOpen);
            await nemo.view._find(selectors.ezPayOpen).click();
            await nemo.driver.sleep(3000);
            await nemo.driver.switchTo().defaultContent();
        },
        async checkEZPayPage() {
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            const monthlypaymentsbefore = await nemo.view._find(selectors.ezPayMonthlyPayments).getText();
            return monthlypaymentsbefore.should.equal('$10.00');
        },

        async CalculateAmount() {
            await nemo.driver.sleep(3000);
            await nemo.view._waitVisible(selectors.ezPayTextBox);
            await nemo.view._find(selectors.ezPayTextBox).clear();
            await nemo.view._find(selectors.ezPayTextBox).sendKeys(300.0);
            await nemo.view._waitVisible(selectors.ezPayCalculate);
            await nemo.view._find(selectors.ezPayCalculate).click();
            await nemo.driver.sleep(3000);
        },
        async checkMonthlyPaymentsAfterCalculate() {
            const monthlypayments = await nemo.view._find(selectors.ezPayMonthlyPayments).getText();
            return monthlypayments.should.equal('$100.00');
        },

        async checkTotalIntrestAfterCalculate() {
            const totalintrest = await nemo.view._find(selectors.ezPayTotalInterest).getText();
            return totalintrest.should.equal('$300.00');
        },

        async clearAmount() {
            await nemo.view._find(selectors.ezPayTextBox).clear();
            await nemo.view._find(selectors.ezPayCalculate).click();
            await nemo.driver.sleep(2000);
        },
        async canOpenCloseEZpayAccordion() {
            await nemo.view._waitVisible(selectors.ezPayAccordion);
            await nemo.view._find(selectors.ezPayAccordion).click();
            await nemo.driver.sleep(3000);
            const ezPayAccordion = await nemo.view._finds(selectors.ezPayAccordion);
            await nemo.driver
                .actions()
                .mouseMove(ezPayAccordion[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.sleep(2000);
        },
        async canOpenClosePromotionAccordion() {
            await nemo.view._waitVisible(selectors.ezPayPromotionAccordion);
            await nemo.view._find(selectors.ezPayPromotionAccordion).click();
            await nemo.driver.sleep(3000);
            const promotionaccordion = await nemo.view._finds(selectors.ezPayPromotionAccordion);
            await nemo.driver
                .actions()
                .mouseMove(promotionaccordion[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.sleep(2000);
        },
        async canChangeTabs() {
            const ezpayselected = await nemo.view._find(selectors.ezPayTab).getAttribute('class');
            if (ezpayselected === 'selected') {
                await nemo.view._find(selectors.ezPayTabClick).click();
            }
            await nemo.driver.sleep(2000);
            const niselected = await nemo.view._find(selectors.noInterestTab).getAttribute('class');
            if (niselected === 'selected') {
                await nemo.view._find(selectors.noInterestTabClick).click();
            }
            await nemo.driver.sleep(2000);
            await nemo.driver.switchTo().defaultContent();
        },

        async closeEZPayBanner() {
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            await nemo.view._waitVisible(selectors.ezCloseBanner);
            await nemo.view._find(selectors.ezCloseBanner).click();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },
        async closesOnEscKey() {
            await this.viewEZPayBanner();
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
            await this.viewEZPayBanner();
            const iframeElement = await nemo.view._finds(selectors.iframe);
            await nemo.view._waitVisible(selectors.iframe);
            await nemo.driver.switchTo().frame(iframeElement[0]);
            const container = await nemo.view._finds(selectors.ezPayContainer);
            await nemo.driver
                .actions()
                .mouseMove(container[0], { x: 5, y: 5 })
                .click()
                .perform();
            await nemo.driver.switchTo().defaultContent();
            await nemo.driver.sleep(2000);
        },

        async canReopenEZPayBanner() {
            const ezpaystyle = await nemo.view._find(selectors.ezPayDiv).getAttribute('style');
            const ezpaydisplaystyle = await ezpaystyle.split(';');
            if (ezpaydisplaystyle[0] === 'display: none') {
                await this.viewEZPayBanner();
                await this.closeEZPayBanner();
            }
        },

        async ezpaycollectiveEntry() {
            await this.viewEZPayBanner();
            await this.checkEZPayPage();
            await this.CalculateAmount();
            await this.checkMonthlyPaymentsAfterCalculate();
            await this.checkTotalIntrestAfterCalculate();
            await this.clearAmount();
            await this.canOpenCloseEZpayAccordion();
            await this.canOpenClosePromotionAccordion();
            await this.canChangeTabs();
            await this.closeEZPayBanner();
            await this.closesOnEscKey();
            await this.closesOnOverlayClick();
            await this.canReopenEZPayBanner();
        }
    };
};
