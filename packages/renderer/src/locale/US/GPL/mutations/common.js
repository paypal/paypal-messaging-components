import Logo from '../logos';

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
    ['text.color:grayscale && logo.type:primary', { logo: Logo.PRIMARY.GRAYSCALE }],
    ['text.color:monochrome && logo.type:primary', { logo: Logo.PRIMARY.MONOCHROME }],

    ['text.color:white && logo.type:alternative', { logo: Logo.ALT_PP.WHITE }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.ALT_PP.GRAYSCALE }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.ALT_PP.MONOCHROME }],

    ['text.color:white && logo.type:inline', { logo: Logo.INLINE.WHITE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.INLINE.GRAYSCALE }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.INLINE.MONOCHROME }]
];

export const flexLogoMutations = [
    ['color:gray', { logo: Logo.PRIMARY.COLOR }],
    ['color:white', { logo: Logo.PRIMARY.COLOR }],
    ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }],
    ['color:monochrome', { logo: Logo.PRIMARY.MONOCHROME }],
    ['color:grayscale', { logo: Logo.PRIMARY.GRAYSCALE }]
];
