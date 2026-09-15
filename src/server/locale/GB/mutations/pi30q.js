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
                    textWrap(textSize * 32, textSize, 'GB'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    `.weak { display: none}`,
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'medium' }, { tag: 'xsmall' }],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 32 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.weak { display: none}`,
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.weak { display: none}`,
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 32, textSize, 'GB'),
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.weak { display: none}`,
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18)],
                logo: false,
                headline: [
                    { tag: 'medium', replace: [[/\.$/, '']] },
                    { tag: 'xsmall', replace: [['later.', 'later']] }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    { tag: 'medium', replace: [[/\.$/, '']] },
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
                disclaimer: ['extra', 'default'],
                styles: [
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }'
                ]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    logo20x1(),
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
