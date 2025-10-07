import getTextStyles from './text';
import flex from './flex';

export default function getStyles(language) {
    return {
        'layout:text': getTextStyles(language),
        'layout:flex': flex
    };
}
