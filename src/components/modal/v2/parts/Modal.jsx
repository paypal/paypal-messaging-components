/** @jsx h */
import { h } from 'preact';

import { TransitionStateProvider, XPropsProvider, ServerDataProvider } from '../lib';

const Modal = ({ styles, serverData, children }) => {
    return (
        <XPropsProvider>
            <ServerDataProvider data={serverData}>
                <TransitionStateProvider>
                    <style>{styles}</style>
                    {children}
                </TransitionStateProvider>
            </ServerDataProvider>
        </XPropsProvider>
    );
};

export default Modal;
