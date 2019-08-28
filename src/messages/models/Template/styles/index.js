import text from './text';
import flex from './flex';
import legacyHtml from './legacyHtml';
import custom from './custom';

const styles = {
    'layout:text': text,
    'layout:flex': flex
};

// Legacy and custom styles are only needed for US
if (__MESSAGES__.__LOCALE__ === 'US') {
    styles['layout:legacy'] = legacyHtml;
    styles['layout:custom'] = custom;
}

export default styles;
