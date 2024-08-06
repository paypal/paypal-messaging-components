<!-- COMMANDS -->

npx playwright test

<!-- Runs the end-to-end tests. -->

npx playwright test --workers 3

<!-- running the tests in parelle -->

npx playwright test example.spec.js

 <!-- Runs the tests in a specific file. -->

npx playwright test example example2

<!-- Runs the tests for multiple specific files. -->

npx playwright test one two

<!-- runs files that have one or two in the file name -->

npm playwright test -g "check title"

<!-- runs individual test in test file with the matching title
npx playwright test -g "get started link" -->

npx playwright test --project=chromium

<!-- Runs the tests only on Desktop Chrome.
runs on specific browser -->

npx playwright test --headed

<!-- runs test in headed mode
(broswer comes up on screen - takes more time) -->

npx playwright test --project=chromium --headed

npx playwright test --debug

<!-- Runs the tests in debug mode. -->

npx playwright test example.spec.js --debug

<!-- debug specific test file -->

npx playwright test example.spec.js:21 --debug

<!-- debug starting from specific line where test(...start) -->

npx playwright test --ui

<!-- Starts the interactive UI mode. -->

npx playwright codegen

<!-- Auto generate tests with Codegen. -->
<!-- opens inspector to record test -->

--debug

<!-- opens codegen debug tool -->
