import logoPrimary from './logo--primary.css';
import logoAlternative from './logo--alternative.css';
import logoTop from './logo--top.css';
import logoInline from './logo--inline.css';
import logoNone from './logo--none.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';

export default [
    ['logo.type:primary', logoPrimary],
    ['logo.position:top', logoTop],

    ['logo.type:alternative', logoAlternative],

    ['logo.type:inline', logoInline],

    ['logo.type:none', logoNone],

    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale]
];
