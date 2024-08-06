import { test, expect } from '@playwright/test';

test.skip('test one', async ({ page }) => {});
test('not yet ready', async ({ page }) => {
    test.fail();
});
test.fixme('test to be fixed', async ({ page }) => {});
test('slow test', async ({ page }) => {
    test.slow();
});
test.only('focus this test', async ({ page }) => {
    // Run only focused tests in the entire project
});

//tags @fast @smoke
test('Test full report @smoke', async ({ page }) => {
    // ...
});
// npx playwright test --grep “@smoke”

// skip tests with certain tags
// npx playwright test --grep-invert “@smoke”
