# PayPal Credit Messaging

---

[![Build Status](https://travis-ci.org/paypal/paypal-messaging-components.svg?branch=master)](https://travis-ci.org/paypal/paypal-messaging-components) [![dependencies Status](https://david-dm.org/paypal/paypal-messaging-components/status.svg)](https://david-dm.org/paypal/paypal-messaging-components) [![devDependencies Status](https://david-dm.org/paypal/paypal-messaging-components/dev-status.svg)](https://david-dm.org/paypal/paypal-messaging-components?type=dev)

A messaging component allowing easy integration of PayPal Credit Messages onto your site.

## Dev Docs

See **[developer.paypal.com/docs/business/pay-later/integrate/](https://developer.paypal.com/docs/business/pay-later/integrate/)**

---

## Development

Please feel free to follow the [Contribution Guidelines](./CONTRIBUTING.md) to contribute to this repository. PRs are welcome, but for major changes please raise an issue first.

### Quick Setup

Set up your env:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run in dev mode:

```bash
npm start
```

## Testing

### Functional

To run functional tests, first run `npm run dev:standalone` in one command line instance and `npm run test:func` in a second command line instance. The `dev:standalone` command creates static pages that the functional tests are run on.

## Performance Benchmark

To run performance benchmark, first run `npm run dev:standalone` in one command line instance and `npm run benchmark` in a second command line instance. The `dev:standalone` command creates static pages that the functional tests are run on. To use lighthouse benchmarking install the lighthouse cli via `npm install -g @lhci/cli`. Prior to running benchmark run `LIGHTHOUSE_URL={URL_WITH_NO_BRACKETS} lhci autorun --config=./tools/performance/lighthouserc-desktop.js` and `LIGHTHOUSE_URL={URL_WITH_NO_BRACKETS} lhci autorun --config=./tools/performance/lighthouserc-mobile.js`

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.
