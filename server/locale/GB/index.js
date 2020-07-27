import getMutations from './mutations';
import logos from './logos';
import styles from './styles';
import validOptions from './validOptions';

export default {
    localeClass: 'locale--GB',
    productName: ['with', 'Flex'],
    minimumSizeOptions: {
        style: {
            layout: 'text',
            logo: {
                position: 'top',
                type: 'primary'
            }
        }
    },
    validOptions,
    getMutations,
    logos,
    styles
};
