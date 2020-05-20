import Logo from '../logos';

export default {
    'layout:text': [
        [
            'logo.type:none',
            () => ({
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        replace: [['interest.', 'interest']]
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:inline',
            () => ({
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [{ tag: 'default', replace: [['interest.', 'interest']] }],
                disclaimer: ['default']
            })
        ]
    ]
};
