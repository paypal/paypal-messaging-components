import common from '../common.css';
import base from './base.css';
import logoAlternative from './logo--alternative.css';
import logoInline from './logo--inline.css';
import logoNone from './logo--none.css';
import logoRight from './logo--right.css';
import logoTop from './logo--top.css';
import logoAlternativeTop from './logo--alternativetop.css';
import textWhite from './text--white.css';

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
