/** @jsx h */
import { h } from 'preact';

import { TransitionStateProvider, XPropsProvider, ServerDataProvider, isLander, isIframe } from '../lib';
// import ErrorBoundary from './ErrorBoundary';
import Container from './Container';

import styles from '../styles/index.scss';

// Add these classes to the root <html> element since we need lander specfic styles on it
// We're safe to do this outside of a useEffect since the <html> element will already exist in the DOM
// by the time this script executes.
document.documentElement.className = [isLander && !isIframe && 'lander', isLander && isIframe && 'api-iframe']
    .filter(Boolean)
    .join(' ');

const Modal = ({ serverData, children }) => {
    return (
        <XPropsProvider>
            {/* <ErrorBoundary> */}
            <ServerDataProvider data={serverData}>
                <TransitionStateProvider>
                    <style>{styles._getCss()}</style>
                    <Container>{children}</Container>
                </TransitionStateProvider>
            </ServerDataProvider>
            {/* </ErrorBoundary> */}
        </XPropsProvider>
    );
};

export default Modal;
