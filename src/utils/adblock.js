import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { memoize } from './functional';

/**
 * Check whether or not the current user is running an ad blocker
 * @returns {Promise<Boolean>} Whether adblock is running or not
 */
// eslint-disable-next-line prefer-arrow-callback
export const checkAdblock = memoize(function check() {
    const loops = 5;
    const checkTime = 50;

    const bait = window.document.body.appendChild(window.document.createElement('div'));
    bait.setAttribute(
        'class',
        'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
    );

    // Using setProperty instead of setAttribute to prevent csp nonce issues
    bait.style.setProperty('width', '1px', 'important');
    bait.style.setProperty('height', '1px', 'important');
    bait.style.setProperty('position', 'absolute', 'important');
    bait.style.setProperty('left', '-10000px', 'important');
    bait.style.setProperty('top', '-1000px', 'important');

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
});
