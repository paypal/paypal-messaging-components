import Logo from '../../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallNoWrap,
    addPeriod
} from '../../../../message/mediaQueries';
import { textLogoMutations } from '../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 8.5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 15),
                    xSmallNoWrap(textSize * 7.7),
                    addPeriod(),
                    `@media screen and 
                    (min-width: ${textSize * 23.8}px),
                    (max-width: ${textSize * 21.8}px) {
                        .message__headline > .tag--medium > span > span.br:last-child {white-space: normal;}
                    }`
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['nach']
                    },
                    { tag: 'xsmall', br: [','] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 8),
                    setLogoTop(textSize * 26.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 9.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 15.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 14),
                    altNoWrap(textSize * 14),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `.locale--DE .message__messaging .tag--medium span.br:last-child {white-space:normal;}`,
                    xSmallNoWrap(textSize * 8),
                    `@media screen and (max-width: ${textSize *
                        12.5}px) { .locale--DE .message__messaging { white-space: nowrap;}}`
                ],
                headline: [
                    { tag: 'medium', br: ['nach'] },
                    { tag: 'xsmall', br: ['später'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 14)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['bei']
                    },
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 14),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['bei']
                    },
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
