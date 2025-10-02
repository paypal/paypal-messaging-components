import logoInline from './logo--inline.css';
import logoInlineFr from './logo--inline_fr.css';
import sharedGPLTextStyles from '../../../common/styles/GPL/text';

export default function getTextStyles(language) {
    const inlineLogoCss = language === 'fr-CA' ? logoInlineFr : logoInline;
    return [...sharedGPLTextStyles, ['logo.type:inline', inlineLogoCss]];
}
