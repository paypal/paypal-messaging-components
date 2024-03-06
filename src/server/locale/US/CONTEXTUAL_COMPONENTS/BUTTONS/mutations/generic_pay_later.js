import Logo from '../../../../../message/logos';
import { textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../../message/mediaQueries';
import { textLogoMutations } from '../../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 13, textSize, 'US'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'xsmall' }],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    setLogoTop(textSize * 17),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.locale--US .message__messaging {padding-right: 0.4rem;}`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right && text.align:right',
            ({ textSize }) => ({
                styles: [
                    setLogoTop(textSize * 17),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),

                    `.locale--US .message__logo-container {margin-left: 0.4rem;}`
                ]
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
                    `@media screen and (max-width: ${textSize * 10.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'US'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline .tag--xsmall > span {white-space: normal;}`
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 37.3}) {.message__content {margin-top: 0px;}}`,
                    `.message__headline span:last-child > span::before {
                        content: 'PayPal';
                        display: inline-block;
                        font-weight: bold;
                    }
                    .message__headline span:last-child > strong {
                        display: none;
                    }`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.locale--US .message__logo-container::after  {
                        content: '';
                    }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
