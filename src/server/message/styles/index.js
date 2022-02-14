import text from './text';
import flex from './flex';
import custom from './custom';

const styles = {
    'layout:text': text,
    'layout:flex': flex,
    // TODO: Separate custom styles/mutations into modules
    'layout:custom': custom
};

export default styles;
