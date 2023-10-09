/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { canDebug, DEBUG_CONDITIONS, MODAL_DOM_EVENT, ppDebug } from '../../../../utils';
import { useTransitionState } from '../lib';

const Overlay = () => {
    const [, handleClose] = useTransitionState();

    useEffect(() => {
        const handleEscapeKeyPress = evt => {
            if (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27) {
                if (canDebug(DEBUG_CONDITIONS.DOM_EVENTS)) {
                    ppDebug(`EVENT.MODAL.${window?.xprops?.index}.KEYUP.ESCAPE`, { inZoid: true, debugObj: evt });
                }
                handleClose('Escape Key');
            }
        };

        window.addEventListener(MODAL_DOM_EVENT.KEYUP, handleEscapeKeyPress);

        return () => window.removeEventListener(MODAL_DOM_EVENT.KEYUP, handleEscapeKeyPress);
    });

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <div className="overlay" onClick={() => handleClose('Modal Overlay')} />;
};

export default Overlay;
