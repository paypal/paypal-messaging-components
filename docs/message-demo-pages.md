# Demo Pages

## Standalone

[demo/standalone.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/standalone.html) is the standard page to edit and view when confirming changes were successful without using other PayPal infrastructure.

## View Multiple Banners

### Pages

-   [demo/text.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/text.html) is the page for viewing multiple text banners with multiple configurations.
-   [demo/flex.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/flex.html) is the page for viewing multiple flex banners with multiple configurations.
-   [demo/helpers/accounts.js](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/helpers/accounts.js) notates which accounts should be used to render a message banner.

### Usage

Both pages have code ready to be uncommented or commented out to change which subsets are displayed and in what manner.

#### window.VIEW

`window.VIEW` contains values for changing how the banners are represented and shown on the page.

-   `showAccounts<Boolean>`: show the account used for the message within the h2 banner that appears before the message banner
-   `showLabels<Boolean>`: show the config options used for the message via the h4 banner that appears before the message banner
-   `filterLabels<Boolean>`: when true, filter out config options that represent redundant information, such as when zero or one values were used for the option, so all banners are using the same variation of the given option
-   `labelPatterns<Arary<RegExp>>`: only show options in the h4 header that match one of the follow Regular Expression patterns (Note: labelPatterns requires `filterLabels:true`)

`window.CONFIG` contains the config options and the values they should use. Each unique combination of config options will render a new banner with the unique set of config options.

## Snapshots

### Pages

-   [demo/snapshot/banner.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/snapshot/banner.html) is the page for creating snapshots of a message banner.Optional query parameters includes:

    -   `config`
    -   `padding`

-   [demo/snapshot/modal.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/snapshot/modal.html) is the page for creating snapshots of a message modal. Optional query parameters includes:

    -   `config`
    -   `padding`
    -   `click`

-   [demo/snapshot/multi-banner.html](https://github.com/paypal/paypal-messaging-components/blob/develop/demo/snapshot/multi-banner.html) is the page for creating snapshots of multiple message banners with the express purpose of showing font size relative to other banners with different font sizes. Optional query parameters includes:
    -   `config`
    -   `padding`
    -   `bannerGroup`

### Query Parameters

-   `config`: json data to plug into the sdk to generate a config. An `account` is required.
-   `padding`: accepts a number specifying how much whitespace should surround the text banner in pixels
-   `bannerGroup`: determines which grouping of banners to render.
    -   `all`: **Default** renders a banner for each supported font size
    -   `small`: renders banners smaller than the default size, 10-11
    -   `default`: renders a single banner showing what a default message looks like with `12px` font size
    -   `large`: renders banners larger than the default size, 13-16
-   `click`: when `true`, click the fake message banner and hide it to immediately show just the modal
