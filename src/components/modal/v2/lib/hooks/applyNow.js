import { useTransitionState, useXProps, useServerData } from '../providers';

export default (clickTitle, src = 'link_click') => {
    const { payerId } = useServerData();
    const { onClick, refId, env = 'production' } = useXProps();

    const [, handleClose] = useTransitionState();

    const urlBase = {
        local: __MESSAGES__.__DOMAIN__.__STAGE__,
        stage: __MESSAGES__.__DOMAIN__.__STAGE__,
        sandbox: 'https://www.sandbox.paypal.com',
        production: 'https://www.paypal.com'
    }[env];

    return () => {
        onClick({ linkName: clickTitle, src });
        // TODO: Get finalized query param keys
        const win = window.open(
            `${urlBase}/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=${refId}&payer_id=${payerId}`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
