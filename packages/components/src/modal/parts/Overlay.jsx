/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useTransitionState } from '../lib';

const Overlay = ({ contentMaxWidth, contentMaxHeight }) => {
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

    // Overlay must be split because the content wrapper fills
    // the full screen and will capture the onClick event
    return (
        <Fragment>
            <div className="overlay" />
            {contentMaxWidth && (
                <Fragment>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        className="overlay-side left"
                        onClick={() => handleClose('Modal Overlay')}
                        style={{ left: 0, width: `calc((100% - ${contentMaxWidth}px) / 2)` }}
                    />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        className="overlay-side right"
                        onClick={() => handleClose('Modal Overlay')}
                        style={{ right: 0, width: `calc((100% - ${contentMaxWidth}px) / 2)` }}
                    />
                </Fragment>
            )}
            {contentMaxHeight && (
                <Fragment>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        className="overlay-side top"
                        onClick={() => handleClose('Modal Overlay')}
                        style={{ left: 0, top: 0, width: `100%`, height: `calc((100% - ${contentMaxHeight}px) / 2)` }}
                    />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        className="overlay-side bottom"
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
            )}
        </Fragment>
    );
};

export default Overlay;
