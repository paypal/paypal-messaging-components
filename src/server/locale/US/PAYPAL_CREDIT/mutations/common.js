import Logo from '../logos';

/**
 * Assigns appropriate logo based on message config options.
 * Used in mutations files where config settings are the same across many accounts.
 */

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.CREDIT_REBRAND_BADGE.WHITE }],
    ['text.color:white && logo.type:primary && logo.position:left', { logo: Logo.CREDIT_REBRAND_BADGE.WHITE }],
    ['text.color:white && logo.type:primary && logo.position:right', { logo: Logo.CREDIT_REBRAND_BADGE.WHITE }],
    ['text.color:white && logo.type:primary && logo.position:top', { logo: Logo.CREDIT_REBRAND_BADGE.WHITE }],
    ['text.color:white && logo.type:alternative', { logo: Logo.CREDIT_REBRAND_PP_BADGE.WHITE }],
    ['text.color:white && logo.type:inline', { logo: Logo.CREDIT_WORDMARK.WHITE }],

    ['text.color:monochrome && logo.type:primary', { logo: Logo.CREDIT_REBRAND_BADGE.BLACK }],
    ['text.color:monochrome && logo.type:primary && logo.position:left', { logo: Logo.CREDIT_REBRAND_BADGE.BLACK }],
    ['text.color:monochrome && logo.type:primary && logo.position:right', { logo: Logo.CREDIT_REBRAND_BADGE.BLACK }],
    ['text.color:monochrome && logo.type:primary && logo.position:top', { logo: Logo.CREDIT_REBRAND_BADGE.BLACK }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.CREDIT_REBRAND_PP_BADGE.BLACK }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.CREDIT_WORDMARK.BLACK }],

    ['text.color:grayscale && logo.type:primary', { logo: Logo.CREDIT_REBRAND_BADGE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:primary && logo.position:left', { logo: Logo.CREDIT_REBRAND_BADGE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:primary && logo.position:right', { logo: Logo.CREDIT_REBRAND_BADGE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:primary && logo.position:top', { logo: Logo.CREDIT_REBRAND_BADGE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.CREDIT_REBRAND_PP_BADGE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.CREDIT_WORDMARK.GRAYSCALE }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.CREDIT_WORDMARK.COLOR }],
    ['color:white', { logo: Logo.CREDIT_WORDMARK.COLOR }],
    ['color:white-no-border', { logo: Logo.CREDIT_WORDMARK.COLOR }],
    ['color:monochrome', { logo: Logo.CREDIT_WORDMARK.BLACK }],
    ['color:grayscale', { logo: Logo.CREDIT_WORDMARK.GRAYSCALE }]
];
