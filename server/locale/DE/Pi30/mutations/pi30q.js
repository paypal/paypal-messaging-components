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
                    xSmallFallback(textSize * 13),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
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
                    { tag: 'xsmall', br: ['später'] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 12.5),
                    setLogoTop(textSize * 26),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    xSmallNoWrap(textSize * 8.3),
                    `@media screen and 
                    (max-width: ${textSize * 18.67}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ],
                headline: [{ tag: 'medium', br: ['bei'] }, { tag: 'xsmall' }]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 12.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    xSmallNoWrap(textSize * 9),
                    `@media screen and 
                    (max-width: ${textSize * 18.67}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ],
                headline: [{ tag: 'medium', br: ['bei'] }, { tag: 'xsmall' }]
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
                    { tag: 'medium', br: ['bie'] },
                    { tag: 'xsmall', br: ['später'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 13),
                    xSmallNoWrap(textSize * 8),
                    `.locale--DE .message__messaging .tag--medium span.br {white-space:normal;}`
                    // `.locale--DE .message__messaging .tag--medium span.br:nth-child(2) {white-space:nowrap;}`
                ],
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
                    xSmallNoWrap(textSize * 13.8),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`,
                    `.locale--DE .message__messaging .tag--medium span.br {white-space:normal;}`,
                    `.locale--DE .message__messaging .tag--medium span.br:nth-child(2) {white-space:nowrap;}`
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
