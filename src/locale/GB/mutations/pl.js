// import Logo from '../logos';
// import { basicMediaQuery } from '../../US/mutations/mediaQueries';

export default {
    'layout:text': [
        [
            'logo.type:none',
            () => ({
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        replace: [['purchases.', 'purchases']]
                    }
                ],
                disclaimer: ['default']
            })
        ]
    ]
};
