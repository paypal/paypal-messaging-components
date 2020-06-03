/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';

const Overlay = ({ contentMaxWidth, contentMaxHeight }) => {
    const [, handleClose] = useTransitionState();
    const { country } = useXProps();

    useEffect(() => {
        const handleEscapeKeyPress = evt => {
            if (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27) {
                handleClose('Escape Key');
            }
        };

        window.addEventListener('keyup', handleEscapeKeyPress);

        return () => window.removeEventListener('keyup', handleEscapeKeyPress);
    });

    const vertOverlay = () => {
        return (
            <Fragment>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className="modal__overlay-side"
                    onClick={() => handleClose('Modal Overlay')}
                    style={{ left: 0, top: 0, width: `100%`, height: `calc((100% - ${contentMaxHeight}px) / 2)` }}
                />
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className="modal__overlay-side"
                    onClick={() => handleClose('Modal Overlay')}
                    style={{
                        left: 0,
                        bottom: 0,
                        top: 'auto',
                        width: `100%`,
                        height: `calc((100% - ${contentMaxHeight}px) / 2)`
                    }}
                />
            </Fragment>
        );
    };

    // Overlay must be split because the content wrapper fills
    // the full screen and will capture the onClick event
    return (
        <Fragment>
            <div className="modal__overlay" />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                className="modal__overlay-side"
                onClick={() => handleClose('Modal Overlay')}
                style={{ left: 0, width: `calc((100% - ${contentMaxWidth}px) / 2)` }}
            />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                className="modal__overlay-side"
                onClick={() => handleClose('Modal Overlay')}
                style={{ right: 0, width: `calc((100% - ${contentMaxWidth}px) / 2)` }}
            />
            {country === 'GB' ? vertOverlay() : null}
        </Fragment>
    );
};

export default Overlay;
