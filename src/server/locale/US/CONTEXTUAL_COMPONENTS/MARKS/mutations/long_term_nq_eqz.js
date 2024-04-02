import { xSmallFallback, hideDisclaimer } from '../../../../../message/mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--xsmall > span:first-child { white-space: normal; } `,
                    xSmallFallback(textSize * 12),
                    hideDisclaimer(textSize * 12)
                ],
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'xsmall',
                        br: [',']
                    }
                ],
                disclaimer: ['default']
            })
        ]
    ]
};
