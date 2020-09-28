import gpl from './GPL/index';
import ppc from './PPC/index';

export default offerType => {
    switch (offerType) {
        case 'GPL':
        case 'GPLQ':
            return gpl;
        default:
            return ppc;
    }
};
