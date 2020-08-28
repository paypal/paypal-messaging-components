import Logo from '../logos';
import { plAltContentMediaQuery, messageLogoWidth } from '../../../GB/mutations/mediaQueries';

import { xsmallTagMediaQuery, setLogoTop } from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    xsmallTagMediaQuery(textSize),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xsmallTagMediaQuery(textSize * 16),
                    setLogoTop(textSize * 21),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    plAltContentMediaQuery(textSize * 17, textSize * 33, textSize * 23),
                    xsmallTagMediaQuery(textSize),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize)],
                logo: false,
                headline: [
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
                styles: [xsmallTagMediaQuery(textSize), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.INLINE.COLOR,
                headline: [
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ]
    ]
};
