// /src/server/locale/CA/styles/index.js
import flexStyles from './flex';
import getTextStyles from './text'; // import as a function

export default language => ({
    flex: flexStyles, // assuming flexStyles is not language-dependent
    text: getTextStyles(language)
});
