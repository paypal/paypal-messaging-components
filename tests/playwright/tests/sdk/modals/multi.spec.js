import { expect } from '@playwright/test';
import { modalTest } from '../../../pages/modals_fixture';

/**
 * Calculates relative luminance for an RGB color.
 * @param {Array<Number>} color Red, green, and blue channels.
 * @returns {Number} Relative luminance from 0 to 1.
 */
const relativeLuminance = color => {
    const channels = color
        .map(channel => channel / 255)
        .map(channel => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));

    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

/**
 * Calculates the WCAG contrast ratio between two RGB colors.
 * @param {Array<Number>} firstColor First RGB color.
 * @param {Array<Number>} secondColor Second RGB color.
 * @returns {Number} Contrast ratio from 1 to 21.
 */
const contrastRatio = (firstColor, secondColor) => {
    const luminances = [relativeLuminance(firstColor), relativeLuminance(secondColor)].sort((a, b) => b - a);

    return (luminances[0] + 0.05) / (luminances[1] + 0.05);
};

/**
 * Measures each rendered shimmer color against the ancestor backgrounds behind it.
 * @param {import('@playwright/test').Locator} shimmers Rendered shimmer elements.
 * @returns {Promise<Array<{ foregroundColor: Array<Number>, backgroundColor: Array<Number> }>>} Color pairs.
 */
const getShimmerContrastMeasurements = shimmers =>
    shimmers.evaluateAll(elements => {
        const parseCssColor = value => {
            const channels = value.match(/[\d.]+/g)?.map(Number);

            if (!channels || channels.length < 3) {
                throw new Error(`Unsupported CSS color: ${value}`);
            }

            return [...channels.slice(0, 3), channels[3] ?? 1];
        };

        const compositeColor = ([foregroundRed, foregroundGreen, foregroundBlue, foregroundAlpha], background) => {
            const [backgroundRed, backgroundGreen, backgroundBlue, backgroundAlpha] = background;
            const alpha = foregroundAlpha + backgroundAlpha * (1 - foregroundAlpha);

            if (alpha === 0) {
                return [0, 0, 0, 0];
            }

            return [
                (foregroundRed * foregroundAlpha + backgroundRed * backgroundAlpha * (1 - foregroundAlpha)) / alpha,
                (foregroundGreen * foregroundAlpha +
                    backgroundGreen * backgroundAlpha * (1 - foregroundAlpha)) /
                    alpha,
                (foregroundBlue * foregroundAlpha +
                    backgroundBlue * backgroundAlpha * (1 - foregroundAlpha)) /
                    alpha,
                alpha
            ];
        };

        const getEffectiveBackgroundColor = element => {
            const ancestorColors = [];

            for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
                ancestorColors.push(parseCssColor(window.getComputedStyle(ancestor).backgroundColor));
            }

            return ancestorColors
                .reverse()
                .reduce((background, foreground) => compositeColor(foreground, background), [255, 255, 255, 1])
                .slice(0, 3);
        };

        return elements.flatMap(element => {
            const backgroundImage = window.getComputedStyle(element).backgroundImage;
            const foregroundColors = Array.from(backgroundImage.matchAll(/rgba?\([^)]+\)/g), match =>
                parseCssColor(match[0]).slice(0, 3)
            );
            const backgroundColor = getEffectiveBackgroundColor(element);

            return foregroundColors.map(foregroundColor => ({ foregroundColor, backgroundColor }));
        });
    });

modalTest.describe('Long Term Modals', () => {
    ['DEV_US_LONG_TERM', 'DEV_US_LONG_TERM_CHECKOUT'].forEach(account => {
        modalTest(`Announces ${account} loading with contrasting shimmers`, async ({ navigatePage, loadModal }) => {
            await navigatePage({ account, amount: '', offer: 'PAY_LATER_LONG_TERM' });
            const modalIframeElement = await loadModal();
            const modalIframe = await modalIframeElement.contentFrame();

            await modalIframe.locator('input').fill('100');
            const loadingStatus = modalIframe.getByRole('status');
            await expect(loadingStatus).toHaveCount(1);
            await expect(loadingStatus).toHaveText('Loading financing options');
            await expect(modalIframe.locator('.content-column[aria-busy="true"]')).toHaveCount(1);

            const shimmers = modalIframe.locator('.offer__field-loading');
            expect(await shimmers.count()).toBeGreaterThan(0);
            const contrastMeasurements = await getShimmerContrastMeasurements(shimmers);

            expect(contrastMeasurements).not.toHaveLength(0);
            contrastMeasurements.forEach(({ foregroundColor, backgroundColor }) =>
                expect(contrastRatio(foregroundColor, backgroundColor)).toBeGreaterThanOrEqual(3)
            );
        });
    });

    modalTest('US Long Term Multi & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframeElement = await loadModal();
        const modalIframe = await modalIframeElement.contentFrame();
        const financingPlanHeadings = modalIframe.getByRole('heading', { level: 4 });

        await expect(financingPlanHeadings).toHaveCount(3);
        await expect(modalIframe.getByRole('heading', { level: 4, name: /for 6 months$/ })).toBeVisible();
        await expect(modalIframe.getByRole('heading', { level: 4, name: /for 12 months$/ })).toBeVisible();
        await expect(modalIframe.getByRole('heading', { level: 4, name: /for 24 months$/ })).toBeVisible();
        await modalAxeCoreScan(modalIframeElement);
    });
    modalTest('US/DE Long Term Multi & LT NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE Long Term Multi & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('US Long Term Manual Error', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: '', offer: 'PAY_LATER_LONG_TERM' });
        const modalIframeElement = await loadModal();
        const modalIframe = await modalIframeElement.contentFrame();
        await modalIframe.locator('input').type('90');
        await modalIframe.waitForTimeout(3000);
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Paypal Credit No Interest', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAYPAL_CREDIT_NO_INTEREST' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Long Term pl2go', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('Short Term Modals', () => {
    modalTest('US Short Term Multi & ST Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest(
        'US Modal Short Term Multi & ST & No Amount NQ',
        async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
            const modalIframe = await loadModal();
            await modalAxeCoreScan(modalIframe);
        }
    );
    modalTest('GB Short Term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE Pay In One', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: 'PAY_LATER_PAY_IN_1' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU Short Term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU Short Term NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('US/DE Product List Modals', () => {
    modalTest('US, DE Product List', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('US/GB Checkout', () => {
    modalTest('GB Short Term Checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Short Term Checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
