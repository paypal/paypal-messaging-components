import gpl from './GPL/index';
import pi30 from './Pi30/index';
import ratenzahlung from './Ratenzahlung/index';

export default offerType => {
    switch (offerType) {
        case 'GPL:EQZ':
        case 'GPL:GTZ':
        case 'GPLQ:EQZ':
        case 'GPLQ:GTZ':
        case 'GPL:EQZ:NON-DE':
        case 'GPL:GTZ:NON-DE':
        case 'GPLQ:EQZ:NON-DE':
        case 'GPLQ:GTZ:NON-DE':
            return gpl;
        case 'PI30':
        case 'PI30Q':
        case 'PI30NQ':
            return pi30;
        default:
            return ratenzahlung;
    }
};
