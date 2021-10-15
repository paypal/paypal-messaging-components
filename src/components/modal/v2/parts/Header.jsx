/** @jsx h */
import { Fragment, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useTransitionState } from '../lib';
import Icon from './Icon';

const Header = ({ headline, subheadline, className = '', logo, contentWrapper, contentBodyRef }) => {
    const [, handleClose] = useTransitionState();
    const headerIconsRef = useRef(null);
    const [sticky, setSticky] = useState('unsticky');

    // Sticky header on scroll for mobile
    if (contentWrapper.current) {
        contentWrapper.current.addEventListener('scroll', () => {
            const { top } = contentBodyRef.current.getBoundingClientRect();

            if (top <= 22) {
                if (sticky !== 'sticky') setSticky('sticky');
            }

            if (top > 22 && sticky === 'sticky') {
                setSticky('unsticky');
            }
        });
    }

    const renderIcons = () => {
        return (
            <Fragment>
                <div className="logo__wrapper">
                    <div className="pp-logo" alt="PayPal Credit Logo">
                        <Icon name={logo} />
                    </div>
                </div>
                <button
                    className="close"
                    aria-label="Close"
                    type="button"
                    id="close-btn"
                    onClick={() => handleClose('Close Button')}
                >
                    <Icon name="close" />
                </button>
            </Fragment>
        );
    };

    return (
        <div className={`header__wrapper ${className}`}>
            <div className="header__container">
                <div className="header__background-wrapper">
                    <Icon name="header-background" />
                </div>
                <div className="header__icons">{renderIcons()}</div>
                <div className={`header__icons ${sticky}`} ref={headerIconsRef}>
                    {renderIcons()}
                </div>
                <div className="header__content">
                    <h1>{headline}</h1>
                    <h2>{subheadline}</h2>
                </div>
            </div>
        </div>
    );
};

export default Header;
