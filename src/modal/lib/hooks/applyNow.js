import { useXProps } from './helpers';
import useTransitionState from './transitionState';

export default clickTitle => {
    const { onClick, payerId, clientId, amount, refId } = useXProps();
    const [, handleClose] = useTransitionState();

    return () => {
        onClick(clickTitle);
        // TODO: Get finalized query param keys
        const win = window.open(
            `https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER&actor=merchant&mktgrefid=${refId}&${
                payerId ? `payer_id=${payerId}` : `client_id=${clientId}`
            }${amount ? `&amount=${amount}` : ''}`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
