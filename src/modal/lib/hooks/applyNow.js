import { useXProps } from './helpers';
import useTransitionState from './transitionState';

export default clickTitle => {
    const { onClick } = useXProps();
    const [, handleClose] = useTransitionState();

    return () => {
        onClick(clickTitle);
        const win = window.open('https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER');
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
