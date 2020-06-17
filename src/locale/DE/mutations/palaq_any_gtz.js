import Logo from '../logos';
import { altLogoMediaQuery } from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize * 20, 1000],
                headline: 'default',
                disclaimer: 'default'
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 13}px }`],
                headline: {
                    tag: 'default',
                    replace: [['Raten', 'Raten.']]
                }
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [textSize * 21, 1000],
                styles: [`.message__logo { width: ${textSize * 12}px }`]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                logo: false,
                messageWidth: [textSize * 19, 1000]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altLogoMediaQuery(textSize * 36, textSize),
                    '.message__content { display: inline-block; }',
                    '.message__messaging, .message__headline span:only-child { white-space: normal }',
                    `.message__logo-container { width: ${textSize * 11}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                messageWidth: [textSize * 19, 1000],
                headline: {
                    tag: 'default',
                    replace: [['Raten', 'Raten.']]
                }
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
                headline: 'small',
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                logo: [Logo.PRIMARY.WHITE, Logo.ALTERNATIVE.WHITE]
            }
        ],
        [
            'ratio:8x1',
            {
                styles: [
                    '@media (max-aspect-ratio: 61/10) { .locale--DE .message__logo-container { margin-bottom: 2.5vw } }'
                ]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    '@media (max-aspect-ratio: 61/10) { .locale--DE .message__logo-container { margin-bottom: 2.5vw } }'
                ]
            }
        ],
        ['ratio:1x4', { logo: Logo.STACKED.WHITE }],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['ratio:1x4 && color:gray', { logo: Logo.STACKED.COLOR }],
        ['ratio:1x4 && color:white', { logo: Logo.STACKED.COLOR }],
        [
            'ratio:1x1 && color:gray',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white-no-border',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ]
    ]
};
