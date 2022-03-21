/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useTransitionState } from '../lib';

const Overlay = () => {
    const [, handleClose] = useTransitionState();

    useEffect(() => {
        const handleEscapeKeyPress = evt => {
            if (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27) {
                handleClose('Escape Key');
            }
        };

        window.addEventListener('keyup', handleEscapeKeyPress);

        return () => window.removeEventListener('keyup', handleEscapeKeyPress);
    });

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <div className="overlay" onClick={() => handleClose('Modal Overlay')} />;
};

export default Overlay;
