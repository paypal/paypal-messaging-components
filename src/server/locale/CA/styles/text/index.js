import logoInline from './logo--inline.css';
import sharedGPLTextStyles from '../../../common/styles/GPL/text';

export default language => [
    ...sharedGPLTextStyles,
    ...(language === 'fr-CA' ? [['logo.type:inline', logoInline]] : [])
];
