import common from '../common.css';
import base from './css/base.css';
import logoAlternative from './css/logo--alternative.css';
import logoInline from './css/logo--inline.css';
import logoNone from './css/logo--none.css';
import logoRight from './css/logo--right.css';
import logoTop from './css/logo--top.css';
import logoAlternativeTop from './css/logo--alternativetop.css';
import textWhite from './css/text--white.css';

export default [
    ['default', [common, base].join('\n')],

    ['logo.type:alternative', logoAlternative],
    ['logo.type:inline', logoInline],
    ['logo.type:none', [logoInline, logoNone].join('\n')],

    ['logo.position:right', logoRight],
    ['logo.position:top', logoTop],
    ['logo.type:alternative && logo.position:top', logoAlternativeTop],

    ['text.color:white', textWhite]
];
