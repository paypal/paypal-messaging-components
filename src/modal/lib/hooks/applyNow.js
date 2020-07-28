import { useContext } from 'preact/hooks';

import { useXProps } from './helpers';
import useTransitionState from './transitionState';
import { ServerContext } from '../context';

export default clickTitle => {
    const { payerId } = useContext(ServerContext);
    const { onClick, refId, env } = useXProps();

    const [, handleClose] = useTransitionState();

    const urlBase = env === 'production' ? 'paypal' : 'sandbox.paypal';

    return () => {
        onClick(clickTitle);
        // TODO: Get finalized query param keys
        const win = window.open(
            `https://www.${urlBase}.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=${refId}&payer_id=${payerId}`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
