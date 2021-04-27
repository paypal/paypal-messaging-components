# Message Offer Types

## Abbreviations by Locale

The following are abbreviations used in reference to various messages and files

Offer Type (or `offerType` as seen in the `banners/` directory JSON files), is the same as the file name, but it is uppercased and uses a colon in place of the underscore. As an example, the file name `ezp_any_eqz` becomes the offer type `EZP:ANY:EQZ`.

### US (United States)

| Abbreviation | PStudio Name         | File Name       | Message                                                                                                                                                        |
| ------------ | -------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPL          | GPL                  | gpl             | Pay Later                                                                                                                                                      |
| GPLQ         | GPLQ                 | gplq            | Pay Later, Qualifying Purchase                                                                                                                                 |
| GPLNQ        | GPLNQ                | gplnq           | Pay Later, Non-Qualifying Purchase                                                                                                                             |
| GPLNQ_RANGE  | GPLNQ Purchase Range | gplnq_range     | Pay Later, Non-Qualifying message showing the min and max purchase range. This message is limited to merchant accounts added to the appropriate customer list. |
| NIGPL        | \*                   | \*              | Multi Product Modal with Pay Later and No Interest                                                                                                             |
| NI           | NI                   | ni              | No Interest                                                                                                                                                    |
| NIQ          | NIQ                  | niq             | No Interest, Qualifying Purchase                                                                                                                               |
| NINONUS      | NI NON-US            | ni_non-us       | No Interest, Non-US Merchants with a majority US customer base                                                                                                 |
| NINONUSQ     | NIQ NON-US           | niq_non-us      | No Interest, Qualifying Purchase, Non-US Merchants with a majority US customer base                                                                            |
| EAZ          | AEZ                  | ezp_any_eqz     | Easy Pay, APR equal to zero                                                                                                                                    |
| EAG          | AGZ                  | ezp_any_gqz     | Easy Pay, APR greater than zero                                                                                                                                |
| PSZ          | SEZP                 | pala_single_eqz | Pay As Low As, APR equal to zero                                                                                                                               |
| PSG          | SGZP                 | pala_single_gtz | Pay As Low As, APR greater than zero                                                                                                                           |
| PMZ          | MEZP                 | pala_multi_eqz  | Pay As Low As, Multiple Offers Available, APR equal to zero                                                                                                    |
| PMG          | MGZP                 | pala_multi_gtz  | Pay As Low As, Multiple Offers Available, APR greater than zero                                                                                                |

\* NIGPL is for local mocking only and has no PStudio message, nor file.

### DE (Germany)

| Abbreviation | PStudio Name | File Name     | Message                              |
| ------------ | ------------ | ------------- | ------------------------------------ |
| IAZ          | AEZ          | inst_any_eqz  | Installments, APR equal to zero      |
| IAG          | AGZ          | inst_any_gtz  | Installments, APR greater than zero  |
| PQAG         | AGZP         | palaq_any_gtz | Pay As Low As, APR greater than zero |
| PQAZ         | AEZP         | palaq_any_eqz | Pay As Low As, APR equal to zero     |

### GB (or UK)

| Abbreviation | PStudio Name | File Name | Message                        |
| ------------ | ------------ | --------- | ------------------------------ |
| GBPL         | Flex         | pl        | Pay Later                      |
| GBPLQ        | Flex Q       | plq       | Pay Later, Qualifying Purchase |

## Explanation

### Abbreviation Column

-   NI, NIQ, NINONUS, NINONUSQ
    -   NI is for No Interest
    -   Q is for Qualifying
    -   NONUS is for Non-US
-   PSZ, PSG, PMZ, PMG
    -   P is for PALA
    -   S is for Single
    -   M is for Multi
    -   Z is for equal to Zero
    -   G is for Greater than zero
-   EAZ, EAG
    -   E is for Easy Pay
    -   A is for Any
    -   Z is for equal to Zero
    -   G is for Greater than zero
-   AEZ, AGZ, AEZP, AGZP
    -   A is for Any
    -   EZ is for Equal to Zero
    -   GZ is for Greater than Zero
    -   P is for PALA

### PStudio Name Column

For PStudio Names, the above explanations apply except that

-   Z is now EZ for Equal to Zero
-   G is now GZ for Greater than Zero
-   Flex was a previously used name for UK/GB's version of Pay Later

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
