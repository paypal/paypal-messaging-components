import base from './base.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';
import textWhite from './text--white.css';
import logoPrimary from './logo--primary.css';
import logoAlternative from './logo--alternative.css';
import logoInline from './logo--inline.css';
import logoNone from './logo--none.css';
import logoTop from './logo--top.css';
import logoRight from './logo--right.css';
import textCenter from './text--center.css';
import textRight from './text--right.css';

export default [
    ['default', base],
    ['logo.type:primary', logoPrimary],
    ['logo.position:top', logoTop],
    ['logo.position:right', logoRight],

    ['logo.type:alternative', logoAlternative],

    ['logo.type:inline', logoInline],
    ['logo.type:none', logoNone],

    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale],
    ['text.color:white', textWhite],

    ['text.alignment:right', textRight],
    ['text.alignment:center', textCenter]
];
