import Logo from '../logos';

/**
 * Assigns appropriate logo based on message config options.
 * Used in mutations files where config settings are the same across many accounts.
 */

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
    ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
    ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }],
    ['text.color:monochrome && logo.type:primary', { logo: Logo.PRIMARY.BLACK }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.ALTERNATIVE.BLACK }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.ALT_NO_PP.BLACK }],
    ['text.color:grayscale && logo.type:primary', { logo: Logo.PRIMARY.GRAYSCALE }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.ALTERNATIVE.GRAYSCALE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.ALT_NO_PP.GRAYSCALE }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.PRIMARY.COLOR }],
    ['color:white', { logo: Logo.PRIMARY.COLOR }],
    ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }],
    ['color:monochrome', { logo: Logo.PRIMARY.BLACK }],
    ['color:grayscale', { logo: Logo.PRIMARY.GRAYSCALE }]
];
