import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    xSmallFallback,
    logo20x1,
    altNoWrap,
    setLogoTop
} from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'GB'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 44 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'GB'),
                    xSmallFallback(textSize * 16),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 20)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases'],
                        replace: [[/\.$/, '']]
                    },
                    { tag: 'xsmall', replace: [['later.', 'later']] }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases'],
                        replace: [[/\.$/, '']]
                    },
                    { tag: 'xsmall', replace: [['later.', 'later']] }
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
                headline: [{ tag: 'xsmall' }, { tag: 'medium' }],
                disclaimer: ['extra', 'default']
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [logo20x1()],
                headline: [{ tag: 'xsmall' }, { tag: 'medium', br: ['purchases'] }]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [{ tag: 'xsmall' }, { tag: 'medium', br: ['purchases'] }]
            }
        ],
        ...flexLogoMutations
    ]
};
