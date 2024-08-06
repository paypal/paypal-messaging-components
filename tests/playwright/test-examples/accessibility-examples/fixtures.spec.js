// import { test as base, testInfo } from '@playwright/test';
// import { AxeBuilder } from '@axe-core/playwright';

// export const test =
//     base.extend <
//     {
//         accessibilityBuilder: AxeBuilder
//     } >
//     {
//         accessibilityBuilder: async ({ page }, use) => {
//             const accessibilityBuilder = await new AxeBuilder({ page }).withTags([
//                 'wcag2a',
//                 'wcag2aa',
//                 'wcag21a',
//                 'wcag21aa',
//                 'best-practice'
//             ]);
//             await use(accessibilityBuilder);
//         }
//     };
// export const expect = base.expect;
