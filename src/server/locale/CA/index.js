import validOptions from './validOptions';
import getMutations from './mutations';
import logos from '../../message/logos';
import getStyles from './styles';

export default language => ({
    localeClass: 'locale--CA',
    productName: language === 'fr-CA' ? ['avec', 'PayPal.'] : ['with', 'PayPal.'],
    validOptions,
    getMutations,
    logos,
    styles: getStyles
});
