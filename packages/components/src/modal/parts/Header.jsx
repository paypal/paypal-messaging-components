/** @jsx h */
import { h } from 'preact';

import { useTransitionState, useServerData } from '../lib';
import Icon from './Icon';

const LOCALE = {
    LOGO: {
        DE: 'logo-de',
        GB: 'logo',
        FR: 'logo',
        US: 'logo',
        'US-EZP': 'logo-ezp'
    }
};

const Header = ({ children, className = '', logo, wrapperRef }) => {
    const { country } = useServerData();
    const [, handleClose] = useTransitionState();

    return (
        <div className={`header-wrapper ${className}`} ref={wrapperRef}>
            <div className="header-container">
                <header className="header">
                    <div className="logo-wrapper">
                        <div className="logo" alt="PayPal Credit Logo">
                            <Icon name={LOCALE.LOGO[logo || country]} />
                        </div>
                    </div>
                    {children}
                    <button
                        className="close"
                        aria-label="Close"
                        type="button"
                        id="close-btn"
                        onClick={() => handleClose('Close Button')}
                    >
                        <Icon name="close" />
                    </button>
                </header>
            </div>
        </div>
    );
};

export default Header;
