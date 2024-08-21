import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export const test = base.extend({
    // Fixture for running Axe accessibility checks
    runAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async modalIframe => {
            // TODO: US non qualifying & qualifying long term 'best-practice' tag error
            // TODO: 'best-practice' and 'wcag2aa' are resulting in errors, investigate
            const results = await new AxeBuilder({ page })
                .include(modalIframe)
                .withTags(['wcag2a', 'wcag21a', 'wcag21aa'])
                .analyze();
            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    }
});
