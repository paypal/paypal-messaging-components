import text from './text';
import flex from './flex';
import legacyHtml from './legacyHtml';
import custom from './custom';

const styles = {
    'layout:text': text,
    'layout:flex': flex,
    // TODO: Separate legacy and custom styles/mutations into modules
    'layout:legacy': legacyHtml,
    'layout:custom': custom
};

export default styles;
