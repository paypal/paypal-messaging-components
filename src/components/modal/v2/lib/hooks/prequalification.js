import { openPrequalification } from '../utils';

export default (clickTitle, onClick, onClose, queryParams = {}) => {
    return () => {
        if (typeof onClick === 'function') {
            onClick({ linkName: clickTitle });
        }
        // Open to prequalification route
        openPrequalification(queryParams)
            .then(() => {
                if (typeof onClose === 'function') {
                    onClose({ linkName: clickTitle });
                }
            })
            .catch(() => {
                // If prequalify is down or unreachable, keep the modal open.
            });
    };
};
