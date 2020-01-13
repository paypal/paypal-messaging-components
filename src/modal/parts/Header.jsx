/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';
import Icon from './Icon';

const LOCALE = {
    LOGO: {
        DE: 'https://www.paypalobjects.com/upstream/assets/img/de/pp-logo-banner-modal.svg',
        US: 'https://www.paypalobjects.com/upstream/assets/img/pp-logo-banner-modal.svg'
    },
    BACKGROUND: {
        DE: '#f6f7fb',
        US: '#ffffff'
    }
};

const Header = ({ shadow }) => {
    const headerRef = useRef();
    const { country } = useXProps();
    const [, handleClose] = useTransitionState();

    const showApplyNow = country === 'US' && shadow;

    return (
        <div className="modal__header-wrapper">
            <div className="modal__header-container">
                <div className="modal__header">
                    <header
                        ref={headerRef}
                        id="header"
                        className={shadow ? 'show' : ''}
                        style={{ backgroundColor: showApplyNow ? '#005ea6' : LOCALE.BACKGROUND[country] }}
                    >
                        <div
                            className={`logo-wrapper ${showApplyNow && headerRef.current ? 'logo-wrapper--shift' : ''}`}
                        >
                            <div className="logo" alt="PayPal Credit Logo">
                                <Icon name="logo" color={showApplyNow ? '#ffffff' : undefined} />
                            </div>
                        </div>
                        <a
                            href="https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button
                                className="header-apply-now"
                                type="button"
                                style={{ opacity: showApplyNow ? 1 : 0 }}
                            >
                                Apply Now
                            </button>
                        </a>
                        <button
                            aria-label="Close"
                            type="button"
                            className="close"
                            id="close-btn"
                            onClick={() => handleClose('Close Button')}
                        >
                            <Icon name="close" color={showApplyNow ? '#ffffff' : undefined} />
                        </button>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default Header;
