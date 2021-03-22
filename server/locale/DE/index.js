import gpl from './GPL/index';
import ratenzahlung from './Ratenzahlung/index';

export default offerType => {
    switch (offerType) {
        case 'GPL:EQZ':
        case 'GPL:GTZ':
        case 'GPLQ:EQZ':
        case 'GPLQ:GTZ':
            return gpl;
        default:
            return ratenzahlung;
    }
};
