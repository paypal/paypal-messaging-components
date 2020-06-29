/** @jsx h */
import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';
import { ServerContext } from '../lib/context';
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
    const { country } = useContext(ServerContext);
    const [, handleClose] = useTransitionState();

    return (
        <div className="modal__header-wrapper">
            <div className="modal__header-container">
                <div className="modal__header">
                    <header
                        id="header"
                        className={shadow ? 'show' : ''}
                        style={{ backgroundColor: LOCALE.BACKGROUND[country] }}
                    >
                        <img src={LOCALE.LOGO[country]} className="logo" id="logo" alt="PayPal Credit Logo" />
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
