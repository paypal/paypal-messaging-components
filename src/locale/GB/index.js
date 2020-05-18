import getMutations from './mutations';
import logos from '../US/logos';
import styles from './styles';
import validOptions from './validOptions';

export default {
    localeClass: 'locale--GB',
    productName: ['with', 'PayPal.'],
    minimumSizeOptions: {
        'style.layout': 'text',
        'style.logo.position': 'top',
        'style.logo.type': 'primary'
    },
    validOptions,
    getMutations,
    logos,
    styles
};
