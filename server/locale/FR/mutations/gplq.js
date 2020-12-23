import Logo from '../../../message/logos';
import { textWrap, messageLogoWidth, altNoWrap, setLogoTop, logo20x1 } from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 38, textSize, 'FR'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['achats']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [setLogoTop(textSize * 20), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 32, textSize, 'FR'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `@media screen and (max-width: ${textSize *
                        7.5}px) { message__content, .locale--FR  .message__messaging { white-space: nowrap; }}`
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            () => ({
                styles: [],
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        br: ['achats'],
                        replace: [['4X.', '4X']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['achats'],
                        replace: [['4X.', '4X']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PP_PAYPAL.WHITE,
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium'
                    }
                ],
                subHeadline: [{ tag: 'small', br: ['paiement en 4X.'] }],
                disclaimer: ['default']
            }
        ],
        [
            'ratio:1x1',
            {
                subHeadline: [{ tag: 'small', br: ['achats'] }],
                styles: [
                    `@media (min-width: 140px) {.message__headline {font-size: 9.5vw;} .message__sub-headline {font-size: 6vw;}`
                ]
            }
        ],
        [
            'ratio:1x4',
            {
                subHeadline: [{ tag: 'small', br: ['avec', 'et', 'paiement en'] }],
                style: [`@media (aspect-ratio: 1/2) {.message__sub-headline { display: inline;}}`]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [logo20x1()]
            }
        ],
        ...flexLogoMutations
    ]
};
