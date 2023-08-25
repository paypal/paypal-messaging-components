import { useTransitionState, useXProps, useServerData } from '../providers';
import { getGlobalUrl } from '../../../../../utils';

export default (clickTitle, src = 'link_click') => {
    const { payerId } = useServerData();
    const { onClick, refId, env = 'production' } = useXProps();

    const [, handleClose] = useTransitionState();

    return () => {
        onClick({ linkName: clickTitle, src });
        const applyNowUrl = getGlobalUrl('MESSAGE', env, refId, payerId);
        // TODO: Get finalized query param keys
        const win = window.open(applyNowUrl);
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
