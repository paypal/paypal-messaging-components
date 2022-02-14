/** @jsx h */
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { isLander, useTransitionState, useScroll, isIframe } from '../lib';
import Icon from './Icon';

const Header = ({ headline, subheadline, logo, isQualifying = 'false', qualifyingSubheadline }) => {
    const [, handleClose] = useTransitionState();
    const [isScrolled, setScrolled] = useState(false);

    useScroll(
        ({ target: { scrollTop } }) => {
            if (!isScrolled && scrollTop > 0) {
                setScrolled(true);
            } else if (isScrolled && scrollTop <= 0) {
                setScrolled(false);
            }
        },
        [isScrolled]
    );

    // IMPORTANT: These elements cannot be nested inside of other elements.
    // They are using very precise CSS position sticky rules that require this
    // specific adjacent DOM structure
    return (
        <Fragment>
            {(!isLander || isIframe) && (
                <Fragment>
                    <div aria-hidden="true" className="header__fixed-wrapper header__fixed-wrapper--front">
                        <div className="header__background-wrapper header__background-wrapper--gradient">
                            <Icon name="header-background" />
                        </div>
                    </div>
                    <div aria-hidden="true" className="header__fixed-wrapper">
                        <div className="header__background-wrapper">
                            <Icon name="header-background" />
                        </div>
                    </div>
                </Fragment>
            )}
            <div className="header__icons">
                <div className={`logo__wrapper ${isScrolled ? 'logo__wrapper--scroll' : ''}`}>
                    <div className="pp-logo" alt="PayPal Credit Logo">
                        <Icon name={logo} />
                    </div>
                </div>
                {!isLander && (
                    // We don't need to render an 'x' button if the target is a lander since you will close via a
                    // merchant-provided close button from their own iframe, or by closing the window in the case of a webpage.
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
                {(!isLander || isIframe) && (
                    <div className="header__fixed-wrapper header__fixed-wrapper--front">
                        <div className="header__background-wrapper header__background-wrapper--sticky">
                            <Icon name="header-background" />
                        </div>
                    </div>
                )}
            </div>
            <div className="header__content">
                <h1>{headline}</h1>
                {isQualifying === 'true' && qualifyingSubheadline !== '' ? (
                    <h2>{qualifyingSubheadline}</h2>
                ) : (
                    <h2>{subheadline ?? ''}</h2>
                )}
            </div>
        </Fragment>
    );
};

export default Header;
