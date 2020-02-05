import { useContext } from 'preact/hooks';

import { useXProps } from './helpers';
import useTransitionState from './transitionState';
import { ServerContext } from '../context';

export default clickTitle => {
    const { payerId } = useContext(ServerContext);
    const { onClick, amount, refId } = useXProps();
    const [, handleClose] = useTransitionState();

    return () => {
        onClick(clickTitle);
        // TODO: Get finalized query param keys
        const win = window.open(
            `https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER&actor=merchant&mktgrefid=${refId}&payer_id=${payerId}${
                amount ? `&amount=${amount}` : ''
            }`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
