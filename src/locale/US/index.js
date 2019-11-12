import validOptions from './validOptions';
import getMutations from './mutations';
import logos from './logos';
import styles from './styles';
import getModalContent, { getModalType } from './modal';

export default {
    localeClass: 'locale--US',
    productName: ['with', 'PayPal Credit.'],
    minimumSizeOptions: {
        'style.layout': 'text',
        'style.logo.position': 'top',
        'style.logo.type': 'primary'
    },
    validOptions,
    getMutations,
    logos,
    styles,
    getModalContent,
    getModalType
};
