import Logo from '../logos';

export const textLogoMutations = [
    ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
    ['text.color:grayscale && logo.type:primary', { logo: Logo.PRIMARY.GRAYSCALE }],
    ['text.color:monochrome && logo.type:primary', { logo: Logo.PRIMARY.MONOCHROME }],

    ['text.color:white && logo.type:alternative', { logo: Logo.PRIMARY.WHITE[0] }],
    ['text.color:grayscale && logo.type:alternative', { logo: Logo.PRIMARY.GRAYSCALE[0] }],
    ['text.color:monochrome && logo.type:alternative', { logo: Logo.PRIMARY.MONOCHROME[0] }],

    ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }],
    ['text.color:grayscale && logo.type:inline', { logo: Logo.ALT_NO_PP.GRAYSCALE }],
    ['text.color:monochrome && logo.type:inline', { logo: Logo.ALT_NO_PP.MONOCHROME }]
];
