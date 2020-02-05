import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { curry } from '../../../utils';

/**
 * Check if an element is within the current viewport
 * @param {HTMLElement} container DOM element
 * @returns {boolean} Visible or not visible
 */
function isInViewport(container) {
    const containerRect = container.getBoundingClientRect();

    const bannerY = (containerRect.top + containerRect.bottom) / 2;
    const bannerX = (containerRect.left + containerRect.right) / 2;

    if (bannerY > window.innerHeight || bannerY < 0) {
        return false;
    }
    if (bannerX > window.innerWidth || bannerX < 0) {
        return false;
    }

    return true;
}

/**
 * Check if an element is visually hidden on a page
 * @param {HTMLElement} container DOM element
 * @returns {boolean} Hidden or not hidden
 */
function isHidden(container) {
    if (typeof window.getComputedStyle === 'function') {
        const containerStyles = window.getComputedStyle(container);
        if (
            containerStyles.getPropertyValue('display') === 'none' ||
            containerStyles.getPropertyValue('visibility') === 'hidden' ||
            containerStyles.getPropertyValue('clip') !== 'auto'
        )
            return true;
    }

    const containerRect = container.getBoundingClientRect();
    if (
        containerRect.left > window.document.body.scrollWidth ||
        containerRect.right < 0 ||
        containerRect.top > window.document.body.scrollHeight ||
        containerRect.bottom < 0
    )
        return true;

    return container.offsetWidth === 0 || container.offsetHeight === 0;
}

/**
 * Check whether or not the current user is running an ad blocker
 * @returns {Promise<Boolean>} Whether adblock is running or not
 */
function checkAdblock() {
    const loops = 5;
    const checkTime = 50;

    const bait = window.document.body.appendChild(window.document.createElement('div'));
    bait.setAttribute(
        'class',
        'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
    );
    bait.setAttribute(
        'style',
        'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
    );
    const baitStyles = window.getComputedStyle !== undefined ? window.getComputedStyle(bait) : undefined;

    return new ZalgoPromise(resolve => {
        (function checkBait(loop) {
            if (loop <= 0) {
                window.document.body.removeChild(bait);
                return resolve(false);
            }
            if (
                window.document.body.getAttribute('abp') !== null ||
                (baitStyles &&
                    (baitStyles.getPropertyValue('display') === 'none' ||
                        baitStyles.getPropertyValue('visibility') === 'hidden')) ||
                bait.offsetParent === null ||
                bait.offsetHeight === 0 ||
                bait.offsetLeft === 0 ||
                bait.offsetTop === 0 ||
                bait.offsetWidth === 0 ||
                bait.clientHeight === 0 ||
                bait.clientWidth === 0
            ) {
                window.document.body.removeChild(bait);
                return resolve(true);
            }
            return setTimeout(() => {
                checkBait(loop - 1);
            }, checkTime);
        })(loops);
    });
}

export default curry(
    (container, { options: { amount, account, partnerAccount, placement, onClick }, events, track }) => {
        // Get outer most container's page location coordinates
        const containerRect = container.getBoundingClientRect();

        // Create initial payload
        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            integration_type: __MESSAGES__.__TARGET__,
            messaging_version: __MESSAGES__.__VERSION__,
            placement,
            pos_x: Math.round(containerRect.left),
            pos_y: Math.round(containerRect.top),
            browser_width: window.innerWidth,
            browser_height: window.innerHeight,
            visible: isInViewport(container),
            amount
        };

        if (partnerAccount) {
            payload.partner_client_id = partnerAccount;
        } else if (startsWith(account, 'client-id:')) {
            payload.client_id = account.slice(10);
        }

        // No need for scroll event if banner is above the fold
        if (!payload.visible) {
            events.on('scroll', () => {
                if (isInViewport(container)) {
                    events.clear('scroll');
                    track({
                        et: 'CLIENT_IMPRESSION',
                        event_type: 'scroll',
                        visible: true
                    });
                }
            });
        }

        checkAdblock().then(detected => {
            payload.adblock = detected;
            payload.blocked = isHidden(container);
            track(payload, container.getAttribute('data-pp-message-hidden') === 'true');
            track('MORS_IMPRESSION');
        });

        // Check if banner is hidden after it is altered
        // if (window.MutationObserver !== undefined) {
        //     const observer = new MutationObserver(function(mutationsList) {
        //         if (isHidden(wrapper)) {
        //             track(uuid, pageContext, { isHidden: true });
        //         }
        //     });

        //     observer.observe(wrapper.parentNode || wrapper, {
        //         childList: true,
        //         attributes: true,
        //         characterData: true,
        //         subtree: true
        //     });
        // }

        events.on('click', () => {
            track({
                et: 'CLICK',
                event_type: 'click',
                link: 'Banner Wrapper'
            });
            track('MORS_CLICK');
            if (onClick) {
                onClick();
            }
        });

        events.on('hover', () => {
            track({
                et: 'CLIENT_IMPRESSION',
                event_type: 'hover'
            });
            events.clear('hover');
        });
    }
);
