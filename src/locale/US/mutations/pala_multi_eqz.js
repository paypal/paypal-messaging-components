import Logo from '../logos';
import { textSize } from './ni';

export default {
    'layout:text': [
        [
            'default',
            style => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize(style) * 11, 1000],
                headline: {
                    tag: 'small',
                    br: ['/mo']
                },
                disclaimer: 'small'
            })
        ],
        [
            'logo.type:inline',
            style => ({
                styles: [`.message__logo { width: ${textSize(style) * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [textSize(style) * 19, 1000],
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:none',
            style => ({
                logo: false,
                messageWidth: [textSize(style) * 17, 1000],
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:alternative',
            style => ({
                styles: [`.message__logo-container { width: ${textSize(style) * 8}px }`],
                logo: Logo.ALTERNATIVE.COLOR
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'medium', br: ['low as', 'at'] },
                subHeadline: 'small',
                disclaimer: 'xsmall'
            }
        ],
        ['ratio:1x4', { subHeadline: { tag: 'small', br: ['money'] } }],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-medium',
                subHeadline: 'legacy-large',
                disclaimer: 'legacy-small'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
        ['size:120x90', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:234x60', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:300x50', { disclaimer: 'legacy-medium' }],
        ['size:468x60', { disclaimer: 'legacy-medium' }],
        [
            'size:250x250',
            {
                headline: 'legacy-large'
            }
        ],
        ['size:728x90', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:540x200', { disclaimer: 'legacy-medium' }],
        ['size:170x100', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }]
    ]
};
