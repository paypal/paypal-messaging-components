/** @jsx h */
import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';
import Icon from './Icon';
import Button from './Button';

const LOCALE = {
    LOGO: {
        DE: 'logo-de',
        US: 'logo'
    },
    BACKGROUND: {
        DE: 'linear-gradient(rgba(246, 247, 251, 1) 70px, rgba(246, 247, 251, 0))',
        US: 'linear-gradient(rgba(255, 255, 255, 1) 70px, rgba(255, 255, 255, 0))'
    }
};

const Header = () => {
    const headerRef = useRef();
    const { country, onClick } = useXProps();
    const [transitionState, handleClose] = useTransitionState();
    const [showApplyNow, setApplyNow] = useState(false);

    useEffect(() => {
        const handleApplyNowShow = () => !showApplyNow && setApplyNow(true);
        const handleApplyNowHide = () => showApplyNow && setApplyNow(false);

        window.addEventListener('apply-now-visible', handleApplyNowShow);
        window.addEventListener('apply-now-hidden', handleApplyNowHide);

        return () => {
            window.removeEventListener('apply-now-visible', handleApplyNowShow);
            window.removeEventListener('apply-now-hidden', handleApplyNowHide);
        };
    }, [showApplyNow]);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setApplyNow(false);
        }
    }, [transitionState]);

    // const showApplyNow = country === 'US' && hasShadow;

    return (
        <div className="modal__header-wrapper">
            <div className="modal__header-container">
                <div className="modal__header">
                    <header ref={headerRef} className="header" style={{ background: LOCALE.BACKGROUND[country] }}>
                        <div className={`header__logo-wrapper ${showApplyNow ? 'header__logo-wrapper--shift' : ''}`}>
                            <div className="header__logo" alt="PayPal Credit Logo">
                                <Icon name={LOCALE.LOGO[country]} />
                            </div>
                        </div>
                        <a
                            onClick={() => onClick('Apply Now Header')}
                            href="https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                className="header__apply-now"
                                style={{
                                    opacity: showApplyNow ? 1 : 0,
                                    transform: showApplyNow ? 'translate(-50%, 0)' : 'translate(-50%, 1.3rem)'
                                }}
                            >
                                Apply Now
                            </Button>
                        </a>
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
        </div>
    );
};

export default Header;
