import base from './base.css';
import logoPrimary from './logo--primary.css';
import logoAlternative from './logo--alternative.css';
import logoTop from './logo--top.css';
import logoRight from './logo--right.css';
import logoInline from './logo--inline.css';
import logoInlineWhite from './logo--inlinewhite.css';
import logoNone from './logo--none.css';
import textWhite from './text--white.css';

export default [
    ['default', base],
    ['logo.type:primary', logoPrimary],
    ['logo.position:top', logoTop],
    ['logo.position:right', logoRight],

    ['logo.type:alternative', logoAlternative],

    ['logo.type:inline', logoInline],
    ['logo.type:inline && text.color:white', logoInlineWhite],

    ['logo.type:none', logoNone],

    ['text.color:white', textWhite]
];
