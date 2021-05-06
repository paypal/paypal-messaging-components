import getMutations from './mutations';
import logos from '../../message/logos';
import styles from './styles';
import validOptions from './validOptions';

export default {
    localeClass: 'locale--AU',
    productName: ['with', 'PayPal.'],
    minimumSizeOptions: {
        layout: 'text',
        logo: {
            position: 'top',
            type: 'primary'
        }
    },
    validOptions,
    getMutations,
    logos,
    styles
};
