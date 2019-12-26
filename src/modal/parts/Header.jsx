/** @jsx h */
import { h } from 'preact';

import { useTransitionState, useXProps } from '../lib/hooks';
import Icon from './Icon';

const LOGO_URL = {
    DE: 'https://www.paypalobjects.com/upstream/assets/img/de/pp-logo-banner-modal.svg',
    US: 'https://www.paypalobjects.com/upstream/assets/img/pp-logo-banner-modal.svg'
};

const Header = ({ shadow }) => {
    const { type } = useXProps();
    const [, handleClose] = useTransitionState();

    return (
        <div className="modal__header-wrapper">
            <div className="modal__header-container">
                <div className="modal__header">
                    <header
                        id="header"
                        className={shadow ? 'show' : ''}
                        style={{ backgroundColor: type === 'INST' ? '#f6f7fb' : '#ffffff' }}
                    >
                        <img
                            src={type === 'INST' ? LOGO_URL.DE : LOGO_URL.US}
                            className="logo"
                            id="logo"
                            alt="PayPal Credit Logo"
                        />
                        <button
                            aria-label="Close"
                            type="button"
                            className="close"
                            id="close-btn"
                            onClick={() => handleClose('Close Button')}
                        >
                            <Icon name="close" />
                        </button>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default Header;
