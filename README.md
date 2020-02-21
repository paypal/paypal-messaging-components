# PayPal Credit Messaging

---

[![Build Status](https://travis-ci.org/paypal/paypal-messaging-components.svg?branch=master)](https://travis-ci.org/paypal/paypal-messaging-components) [![dependencies Status](https://david-dm.org/paypal/paypal-messaging-components/status.svg)](https://david-dm.org/paypal/paypal-messaging-components) [![devDependencies Status](https://david-dm.org/paypal/paypal-messaging-components/dev-status.svg)](https://david-dm.org/paypal/paypal-messaging-components?type=dev)

A messaging component allowing easy integration of PayPal Credit Messages onto your site.

## Dev Docs

See [**developer.paypal.com/docs/limited-release/sdk-credit-messaging**](https://developer.paypal.com/docs/limited-release/sdk-credit-messaging/)

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

## Configuration Options

Configuration can be handled via HTML attributes or a JS object

### HTML Attribute Configuration

HTML attributes are converted into a JS object internally. Once `data-pp` is removed, dashes separate nested objects. So `data-pp-style-logo-type="alternative"` becomes `{style: {logo: {type: "alternative"}}}`.

```
<div
    data-pp-message
    data-pp-amount="500.00"
    data-pp-style-layout="text"
    data-pp-style-logo-type="alternative"
    data-pp-style-logo-position="top"
></div>
```

### JS Object Configuration

Messages can also be configured using a JS object

```
paypal.Messages({
    amount: 500
    style: {
        layout: 'text',
        logo: {
            type: 'alternative',
            position: 'top'
        }
    }
}).render('.messages');
```

### Possible Options

#### Layout

`style.layout` (or `data-pp-style-layout`) can be set to either `'text'`, for a lightweight text-based message or `'flex'`, for a flexible display banner.

| JS Key         | HTML Attribute Key     | Values         |
| -------------- | ---------------------- | -------------- |
| `style.layout` | `data-pp-style-layout` | `text`, `flex` |

##### Text

Setting `style.layout` to `'text'` will enable further style options for `logo.type`, `logo.position`, and `style.text.color`

| JS Key             | HTML Attribute Key         | Values                                             | Notes                                                        |
| ------------------ | -------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `logo.type`        | `data-pp-logo-type`        | `'primary'`, `'alternative'`, `'inline'`, `'none'` |                                                              |
| `logo.position`    | `data-pp-logo-position`    | `'left'`, `'right'`, `'top'`                       | Used with `logo.type` values of `'primary'`, `'alternative'` |
| `style.text.color` | `data-pp-style-text-color` | `'black'`, `'white'`                               |                                                              |

##### Flex

| JS Key        | HTML Attribute Key    | Values                                                                   | Notes |
| ------------- | --------------------- | ------------------------------------------------------------------------ | ----- |
| `style.color` | `data-pp-style-color` | `'blue'`, `'black'`, `'white'`, `'white-no-border'`, `'white'`, `'gray'` |       |
| `style.ratio` | `data-pp-style-ratio` | `'1x1'`, `'1x4'`, `'8x1'`, `'20x1'`                                      |       |

#### Modal Only

To render only the modal, use `modal.type` and put visible markup inside the element that the modal will be attached to.

```
<div data-pp-message data-pp-modal-type="ni">click here</div>
```

| JS Key       | HTML Attribute Key   | Values          | Notes |
| ------------ | -------------------- | --------------- | ----- |
| `modal.type` | `data-pp-modal-type` | `'ni'`, `'ezp'` |

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.
