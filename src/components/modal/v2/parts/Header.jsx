/** @jsx h */
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { isLander, useServerData, useTransitionState, useScroll, currencyFormat } from '../lib';
import Icon from './Icon';

const Header = ({
    headline,
    subheadline,
    logo,
    isQualifying = 'false',
    qualifyingSubheadline,
    closeButtonLabel = 'Close',
    viewName
}) => {
    const { country } = useServerData();
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

    // Used to specifically target styles to a specific country
    const countryClassName = country?.toLowerCase();

    // IMPORTANT: These elements cannot be nested inside of other elements.
    // They are using very precise CSS position sticky rules that require this
    // specific adjacent DOM structure
    return (
        <Fragment>
            <div aria-hidden="true" className="header__fixed-wrapper header__fixed-wrapper--front">
                <div className="header__background-wrapper header__background-wrapper--gradient" />
            </div>
            <div aria-hidden="true" className="header__fixed-wrapper">
                <div className="header__background-wrapper" />
            </div>
            <div className="header__icons">
                <div className={`logo__wrapper ${isScrolled ? 'logo__wrapper--scroll' : ''}`}>
                    <div className="pp-logo" alt="PayPal">
                        <Icon name={logo} />
                    </div>
                </div>
                {!isLander && (
                    // We don't need to render an 'x' button if the target is a lander since you will close via a
                    // merchant-provided close button from their own iframe, or by closing the window in the case of a webpage.
                    <button
                        className="close"
                        aria-label={closeButtonLabel}
                        type="button"
                        id="close-btn"
                        onClick={() => handleClose('Close Button')}
                    >
                        <Icon name="close" />
                    </button>
                )}
                <div className="header__fixed-wrapper header__fixed-wrapper--front">
                    <div className="header__background-wrapper header__background-wrapper--sticky" />
                </div>
            </div>
            <div className="header__content">
                <Icon name={`${viewName}-desktop`} />
                <Icon name={`${viewName}-mobile`} />
                {/* <Icon name="background-pp-mobile" /> */}
                <h2
                    // id used for aria-labelleby on modal container element
                    id="header__headline"
                    className={`headline-${countryClassName}`}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: headline }}
                />
                {isQualifying === 'true' && qualifyingSubheadline !== '' ? (
                    <p className={`subheadline_p subheadline-${countryClassName} qualifying`}>
                        {qualifyingSubheadline.replace(/(\s?EUR)/g, ' €')}
                    </p>
                ) : (
                    <p
                        className={`subheadline_p subheadline-${countryClassName}`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: currencyFormat(subheadline) ?? '' }}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Header;
