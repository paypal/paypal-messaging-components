import common from '../common.scss';
import base from './base.scss';
import logoAlternative from './logo--alternative.scss';
import logoInline from './logo--inline.scss';
import logoNone from './logo--none.scss';
import logoRight from './logo--right.scss';
import logoTop from './logo--top.scss';
import logoAlternativeTop from './logo--alternativetop.scss';
import textWhite from './text--white.scss';

export default [
    ['default', [common._getCss(), base._getCss()].join('\n')],

    ['logo.type:alternative', logoAlternative._getCss()],
    ['logo.type:inline', logoInline._getCss()],
    ['logo.type:none', [logoInline._getCss(), logoNone._getCss()].join('\n')],

    ['logo.position:right', logoRight._getCss()],
    ['logo.position:top', logoTop._getCss()],
    ['logo.type:alternative && logo.position:top', logoAlternativeTop._getCss()],

    ['text.color:white', textWhite._getCss()]
];
