/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import gpl_no_amount from './gpl_no_amount';
import gpl_non_qual from './gpl_non_qual';
import gplq from './gplq';

/**
 * gpl_no_amount and gpl_non_qual correspond to the message gpl.json
 * gplq corresponds to the message gplq.json
 */
export default function getMutations(id, type, { amount }) {
    switch (id) {
        case 'GPLQ':
            return gplq[type];
        case 'GPL':
            return typeof amount === 'undefined' ? gpl_no_amount[type] : gpl_non_qual[type];
        default:
            return gpl_no_amount[type];
    }
}
