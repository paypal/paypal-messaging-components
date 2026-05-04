import Logo from './logos';

export const textLogoMutations = [
    ['logo.type:primary', { logo: Logo.PAYPAL_BADGE.COLOR }],
    ['text.color:white && logo.type:primary', { logo: Logo.PAYPAL_BADGE.WHITE }],
    ['text.color:grayscale && logo.type:primary', { logo: Logo.PAYPAL_BADGE.GRAYSCALE }],
    ['text.color:monochrome && logo.type:primary', { logo: Logo.PAYPAL_BADGE.MONOCHROME }],

    ['text.color:white && logo.type:alternative', { logo: Logo.PP_MONOGRAM.WHITE }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.PP_MONOGRAM.GRAYSCALE }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.PP_MONOGRAM.MONOCHROME }],

    ['text.color:white && logo.type:inline', { logo: Logo.WORDMARK.WHITE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.WORDMARK.BLACK }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.WORDMARK.BLACK }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.WORDMARK.BLACK }],
    ['color:white', { logo: Logo.WORDMARK.BLACK }],
    ['color:white-no-border', { logo: Logo.WORDMARK.BLACK }],
    ['color:monochrome', { logo: Logo.WORDMARK.BLACK }],
    ['color:grayscale', { logo: Logo.WORDMARK.BLACK }]
];
