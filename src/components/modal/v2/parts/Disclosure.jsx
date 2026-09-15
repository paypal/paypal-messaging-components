/** @jsx h */
import { h } from 'preact';
import Icon from './Icon';

/**
 * Renders external disclosure content inside the modal itself (via an iframe) instead of
 * navigating away. Used for native webview hosts (e.g. Apple Wallet) that have no bridge to
 * intercept and present the link natively.
 */
const Disclosure = ({ url, onBack, backButtonLabel = 'Back' }) => {
    return (
        <div className="disclosure-view" role="dialog" aria-modal="true">
            <button className="disclosure-view__back" type="button" onClick={onBack}>
                <Icon name="chevron-left" />
                <span>{backButtonLabel}</span>
            </button>
            <iframe className="disclosure-view__frame" src={url} title={backButtonLabel} />
        </div>
    );
};

export default Disclosure;
