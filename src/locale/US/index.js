import validOptions from './validOptions';
import getMutations from './mutations';
import logos from './logos';
import styles from './styles';

export default {
    productName: ['with', 'PayPal Credit'],
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
