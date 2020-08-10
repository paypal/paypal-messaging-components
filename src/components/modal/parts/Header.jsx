/** @jsx h */
import { h } from 'preact';

import { useTransitionState, useServerData } from '../lib';
import Icon from './Icon';

const LOCALE = {
    LOGO: {
        DE: 'logo-de',
        GB: 'logo-gb',
        US: 'logo'
    }
};

const Header = ({ children, className = '' }) => {
    const { country } = useServerData();
    const [, handleClose] = useTransitionState();

    return (
        <div className={`modal__header-wrapper ${className}`}>
            <div className="modal__header-container">
                <header className="modal__header">
                    <div className="header__logo-wrapper">
                        <div className="header__logo" alt="PayPal Credit Logo">
                            <Icon name={LOCALE.LOGO[country]} />
                        </div>
                    </div>
                    {children}
                    <button
                        className="header__close"
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
