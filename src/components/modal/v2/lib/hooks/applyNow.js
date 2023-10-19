import { useTransitionState, useXProps, useServerData } from '../providers';
import { getGlobalUrl } from '../../../../../utils';

export default (clickTitle, src = 'link_click') => {
    const { payerId } = useServerData();
    const { onClick, refId } = useXProps();

    const [, handleClose] = useTransitionState();

    return () => {
        onClick({ linkName: clickTitle, src });
        const urlBase = getGlobalUrl('CREDIT_APPLY');
        // TODO: Get finalized query param keys
        const win = window.open(
            `${urlBase}?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=${refId}&payer_id=${payerId}`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
