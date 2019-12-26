/** @jsx h */
import { h } from 'preact';

const Icon = ({ name }) => {
    switch (name) {
        case 'caret':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                    <path
                        fill="none"
                        fillRule="evenodd"
                        stroke="#199DDB"
                        strokeLinecap="round"
                        d="M2.352 5.19l4.474 5.184c.096.111.252.111.348 0l4.474-5.184"
                    />
                </svg>
            );
        case 'close':
            return (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path fillRrule="evenodd" clipRule="evenodd" d="M0 36H36V0H0V36Z" fill="white" fillOpacity="0.01" /> */}
                    <path
                        d="M12 0L0 12"
                        transform="translate(12 12)"
                        stroke="#2C2E2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0 0L12 12"
                        transform="translate(12 12)"
                        stroke="#2C2E2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        case 'info':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
                    <path
                        fill="none"
                        fillRule="evenodd"
                        stroke="#9DA3A6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"
                    />
                </svg>
            );
        default:
            return null;
    }
};

export default Icon;
