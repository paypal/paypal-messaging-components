import { useContext } from 'preact/hooks';

import { useXProps } from './helpers';
import { TransitionContext, STATUS, TRANSITION_TIME } from '../context';

export default function useTransitionState() {
    const { status, setStatus } = useContext(TransitionContext);
    const { hide, onClose } = useXProps();

    return [
        status,
        () => {
            if (status === STATUS.OPEN || status === STATUS.OPENING) {
                setStatus(STATUS.CLOSING);
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                    hide().then(() => setStatus(STATUS.CLOSED));
                }, TRANSITION_TIME);
            }
        }
    ];
}
