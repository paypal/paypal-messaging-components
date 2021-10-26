/** @jsx h */
import { h } from 'preact';

import { TransitionStateProvider, XPropsProvider, ServerDataProvider, IntegrationProvider } from '../lib';

const Modal = ({ styles, serverData, children }) => {
    return (
        <XPropsProvider>
            <ServerDataProvider data={serverData}>
                <TransitionStateProvider>
                    <IntegrationProvider data={{ isLander: __MESSAGES__.__TARGET__ === 'LANDER' }}>
                        <style>{styles}</style>
                        {children}
                    </IntegrationProvider>
                </TransitionStateProvider>
            </ServerDataProvider>
        </XPropsProvider>
    );
};

export default Modal;
