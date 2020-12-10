import Logo from '../../../message/logos';

/**
 * Assigns appropriate logo based on message config options.
 * Used in mutations files where config settings are the same across many accounts.
 */

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.PP_PAYPAL.WHITE }],
    ['text.color:grayscale && logo.type:primary', { logo: Logo.PP_PAYPAL.GRAYSCALE }],
    ['text.color:monochrome && logo.type:primary', { logo: Logo.PP_PAYPAL.MONOCHROME }],

    ['text.color:white && logo.type:alternative', { logo: Logo.PP_PAYPAL.WHITE[0] }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.PP_PAYPAL.GRAYSCALE[0] }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.PP_PAYPAL.MONOCHROME[0] }],

    ['text.color:white && logo.type:inline', { logo: Logo.NO_PP_MONOGRAM.WHITE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.NO_PP_MONOGRAM.GRAYSCALE }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.NO_PP_MONOGRAM.MONOCHROME }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.PP_PAYPAL.COLOR }],
    ['color:white', { logo: Logo.PP_PAYPAL.COLOR }],
    ['color:monochrome', { logo: Logo.PP_PAYPAL.MONOCHROME }],
    ['color:grayscale', { logo: Logo.PP_PAYPAL.GRAYSCALE }]
];
