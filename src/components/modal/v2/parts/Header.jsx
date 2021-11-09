/** @jsx h */
import { Fragment, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { isLander, useTransitionState } from '../lib';
import Icon from './Icon';

const Header = ({
    headline,
    subheadline,
    className = '',
    logo,
    contentWrapper,
    contentBodyRef,
    contentBackground,
    isQualifying = 'false',
    qualifyingSubheadline
}) => {
    const [, handleClose] = useTransitionState();
    const headerIconsRef = useRef(null);
    const [sticky, setSticky] = useState('unsticky');

    const stickyScroll = offset => {
        const { top } = contentBodyRef.current.getBoundingClientRect();

        if (top <= offset) {
            if (sticky !== 'sticky') setSticky('sticky');
        }

        if (top > offset && sticky === 'sticky') {
            setSticky('unsticky');
        }
    };

    // Sticky header on scroll for mobile
    if (contentWrapper.current) {
        contentWrapper.current.addEventListener('scroll', () => {
            stickyScroll(22);
        });
    }

    // Sticky header on scroll for desktop and tablet
    if (contentBackground.current) {
        contentBackground.current.addEventListener('scroll', () => {
            stickyScroll(150);
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
                {/* We don't need to render an 'x' button if the target is a lander since you will close via 
                a merchant-provided close button from their own iframe, or by closing the window in the case of a webpage. */}
                {isLander ? (
                    <Fragment />
                ) : (
                    <button
                        className="close"
                        aria-label="Close button"
                        type="button"
                        id="close-btn"
                        onClick={() => handleClose('Close Button')}
                    >
                        <Icon name="close" />
                    </button>
                )}
            </Fragment>
        );
    };

    return (
        <div className={`header__wrapper ${className}`}>
            <div className="header__container">
                {isLander ? (
                    <Fragment />
                ) : (
                    <div className="header__background-wrapper">
                        <Icon name="header-background" />
                    </div>
                )}
                <div className="header__icons">{renderIcons()}</div>
                <div className={`header__icons ${sticky}`} ref={headerIconsRef}>
                    {renderIcons()}
                </div>
                <div className="header__content">
                    <h1>{headline}</h1>
                    {isQualifying === 'true' && qualifyingSubheadline !== '' ? (
                        <h2>{qualifyingSubheadline}</h2>
                    ) : (
                        <h2>{subheadline}</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
