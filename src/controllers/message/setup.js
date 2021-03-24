import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import {
    getInlineOptions,
    globalState,
    setGlobalState,
    getScript,
    getAccount,
    getCurrency,
    getPartnerAccount,
    insertionObserver,
    getCurrentTime
} from '../../utils';
import Messages from './adapter';

export default function setup() {
    // Populate global config options
    const script = getScript();
    if (script) {
        const inlineScriptOptions = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();

        Messages.setGlobalConfig({
            account: partnerAccount || getAccount(),
            merchantId: partnerAccount && getAccount(),
            currency: getCurrency(),
            ...inlineScriptOptions
        });
    }

    const { namespace } = globalState.config;

    // Allow specified global namespace override
    if (namespace) {
        window[namespace] = {
            ...(window[namespace] || {}),
            Messages
        };

        // Don't clear window.paypal if SDK loaded first
        if (window.paypal && !window.paypal.version) {
            delete window.paypal;
        }
    }

    // When importing the library directly using UMD, window.paypal will not exist
    if (__MESSAGES__.__TARGET__ !== 'SDK' && window.paypal) {
        // Alias for pilot merchant support
        window.paypal.Message = Messages;
    }

    // Requires a merchant account to render a message
    // Prevent auto render from firing inside zoid iframe
    if (!stringStartsWith(window.name, '__zoid__')) {
        const handleContentLoaded = () => {
            // domLoadDelay is the time between the SDK setup() and DOMContentLoaded event
            const domLoadDelay = getCurrentTime() - globalState.scriptLoadTime;
            setGlobalState({
                domLoadDelay
            });

            if (window.performance?.getEntriesByType) {
                // Navigation Timing API version 2 does not give access to "absolute" load times
                // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
                // So we calculate an approximation based on the data that's available
                const [navigationTiming] = window.performance.getEntriesByType('navigation');

                // scriptLoadDelay represents the difference between when the browser started counting and when we did
                // giving us an estimate of how long it took for the SDK to begin execution
                const scriptLoadDelay = navigationTiming.domContentLoadedEventStart - domLoadDelay;

                setGlobalState({
                    scriptLoadDelay
                });
            }

            // If merchant includes multiple SDK scripts, the 1st script will destroy itself
            // and its globalState before this runs causing the account to be undefined
            if (globalState.config.account) {
                Messages.render({ _auto: true });
            }

            // Using a "global" observer to watch for and automatically render
            // any message containers that are dynamically added after auto render
            insertionObserver.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['data-pp-message']
            });
        };
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', handleContentLoaded);
        } else {
            // TODO: Remove setTimeout after ramp. Needed for ramp because the async top level inclusion/exclusion
            // list fetch causes the order of manual render calls and the auto render call to mix up
            setTimeout(handleContentLoaded, 0);
        }
    }
}
