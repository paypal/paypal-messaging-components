import Logo from '../logos';
import { messageLogoWidth } from '../../../GB/mutations/mediaQueries';
import { smallTagMediaQuery, xsmallTagMediaQuery, setLogoTop } from './mediaQueries';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; }`,
                    // `@media screen and (max-width: ${textSize *
                    //     32}px) { .message__content { display: inline-block; } }`,
                    xsmallTagMediaQuery(textSize * 21),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                    // setLogoTop(textSize * 20)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xsmallTagMediaQuery(textSize * 10.75),
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xsmallTagMediaQuery(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; }`,
                    // plAltContentMediaQuery(textSize * 15.75, textSize * 28, textSize * 23),
                    xsmallTagMediaQuery(textSize * 16),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [smallTagMediaQuery(textSize * 18)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [smallTagMediaQuery(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.INLINE.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
