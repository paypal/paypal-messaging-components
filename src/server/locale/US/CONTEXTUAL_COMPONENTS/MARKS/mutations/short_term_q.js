import { xSmallFallback, hideDisclaimer } from '../../../../../message/mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--xsmall > span:first-child { white-space: normal; } `,
                    xSmallFallback(textSize * 13),
                    hideDisclaimer(textSize * 13)
                ],
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'xsmall',
                        br: ['or', ',']
                    }
                ],
                disclaimer: ['default']
            })
        ]
    ]
};
