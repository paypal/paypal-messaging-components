/** @jsx h */
import { h } from 'preact';
import { useTransitionState } from '../lib';
import Icon from './Icon';

const Header = ({
    headline,
    subheadline,
    isQualifying = 'false',
    qualifyingSubheadline,
    className = '',
    logo,
    wrapperRef
}) => {
    const [, handleClose] = useTransitionState();
    return (
        <div className={`header__wrapper ${className}`} ref={wrapperRef}>
            <div className="header__container">
                <div className="header__icons">
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
                </div>
                <div className="header__content">
                    <h1>{headline}</h1>
                    {isQualifying === 'true' ? <h2>{qualifyingSubheadline ?? subheadline}</h2> : <h2>{subheadline}</h2>}
                </div>
            </div>
        </div>
    );
};

export default Header;
