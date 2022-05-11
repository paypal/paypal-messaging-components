import Logo from '../logos';

/**
 * Assigns appropriate logo based on message config options.
 * Used in mutations files where config settings are the same across many accounts.
 */

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.SINGLE_LINE.WHITE }],
    [
        'text.color:white && logo.type:primary && logo.position:left',
        { logo: [Logo.SINGLE_LINE_NO_PAYPAL.WHITE, Logo.SINGLE_LINE.WHITE] }
    ],
    ['text.color:white && logo.type:alternative', { logo: Logo.SINGLE_LINE_NO_PAYPAL.WHITE }],
    ['text.color:white && logo.type:inline', { logo: Logo.SINGLE_LINE_NO_PP.WHITE }],

    ['text.color:monochrome && logo.type:primary', { logo: Logo.SINGLE_LINE.BLACK }],
    [
        'text.color:monochrome && logo.type:primary && logo.position:left',
        { logo: [Logo.SINGLE_LINE_NO_PAYPAL.BLACK, Logo.SINGLE_LINE.BLACK] }
    ],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.SINGLE_LINE_NO_PAYPAL.BLACK }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.SINGLE_LINE_NO_PP.BLACK }],

    ['text.color:grayscale && logo.type:primary', { logo: Logo.SINGLE_LINE.GRAYSCALE }],
    [
        'text.color:grayscale && logo.type:primary && logo.position:left',
        { logo: [Logo.SINGLE_LINE_NO_PAYPAL.GRAYSCALE, Logo.SINGLE_LINE.GRAYSCALE] }
    ],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.SINGLE_LINE_NO_PAYPAL.GRAYSCALE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.SINGLE_LINE_NO_PP.GRAYSCALE }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.STACKED.COLOR }],
    ['color:white', { logo: Logo.STACKED.COLOR }],
    ['color:white-no-border', { logo: Logo.STACKED.COLOR }],
    ['color:monochrome', { logo: Logo.STACKED.BLACK }],
    ['color:grayscale', { logo: Logo.STACKED.GRAYSCALE }]
];
