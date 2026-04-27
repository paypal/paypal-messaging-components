import { openPrequalification } from '../utils';

export default (clickTitle, onClick, queryParams = {}) => {
    return () => {
        if (typeof onClick === 'function') {
            onClick({ linkName: clickTitle });
        }
        // Open to prequalification route.
        openPrequalification(queryParams).catch(() => {
            // If prequalify is down or unreachable, keep the upstream modal open.
        });
    };
};
