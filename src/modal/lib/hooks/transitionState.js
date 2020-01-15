import { useContext } from 'preact/hooks';

import { useXProps } from './helpers';
import { TransitionContext, STATUS } from '../transition';

const TRANSITION_TIME = 350;

export default function useTransitionState() {
    const { status, setStatus } = useContext(TransitionContext);
    const { show, hide, onClose, onProps } = useXProps();

    onProps(newProps => {
        if (newProps.visible && status === STATUS.CLOSED) {
            show();
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setStatus(STATUS.OPENING);
                    setTimeout(() => {
                        setStatus(STATUS.OPEN);
                    }, TRANSITION_TIME);
                });
            });
        }
    });

    return [
        status,
        linkName => {
            if (status === STATUS.OPEN || status === STATUS.OPENING) {
                setStatus(STATUS.CLOSING);
                setTimeout(() => {
                    if (onClose) {
                        onClose(linkName);
                    }
                    hide();
                    setStatus(STATUS.CLOSED);
                }, TRANSITION_TIME);
            }
        }
    ];
}
