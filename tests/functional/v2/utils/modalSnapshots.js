import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot } from './logging';
import { selectors } from './selectors';
import { screenDimensions } from './setup';

const {
    modal: { contentWrapper }
} = selectors;

const toMatchLargeSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

const toMatchSmallSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.003,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchLargeSnapshot, toMatchSmallSnapshot });

const waitForModalReady = async contentWindow => {
    await contentWindow.waitForFunction(
        wrapperSelector => {
            const modalEl = document.querySelector(wrapperSelector);
            if (!modalEl) {
                return false;
            }

            const modalRect = modalEl.getBoundingClientRect();
            if (modalRect.width < 50 || modalRect.height < 50) {
                return false;
            }

            const text = (modalEl.innerText || '').replace(/\s+/g, ' ').trim();
            if (text.length < 30 || /^learn more$/i.test(text)) {
                return false;
            }

            // Wait for spinner to be fully invisible (LongTerm spinner uses
            // opacity:0 default + transition:0.2s; check computed opacity so we
            // wait out the fade-out transition, not just the inline style change)
            const spinner = document.querySelector('.spinner');
            if (spinner) {
                const computedOpacity = parseFloat(window.getComputedStyle(spinner).opacity);
                if (computedOpacity > 0.01) {
                    return false;
                }
            }

            // Wait for loading state to clear (LongTerm fetches offers async)
            if (document.querySelector('.content__wrapper-overflow.loading')) {
                return false;
            }

            // Wait for loading shimmers to be replaced with real content
            if (
                document.querySelector(
                    '.offer__field-loading, .accordion__container.shimmer, .offer__container.shimmer'
                )
            ) {
                return false;
            }

            const meaningfulContent = modalEl.querySelector(
                'h1, h2, .content__row, .offer__container:not(.shimmer), .tile, .instructions, .cta, .button'
            );

            return Boolean(meaningfulContent);
        },
        {
            polling: 50,
            timeout: 8000
        },
        contentWrapper
    );
};

export const settleModalRendering = async contentWindow => {
    await contentWindow.evaluate(async () => {
        if (!document.getElementById('__pp_snapshot_stabilizer__')) {
            const style = document.createElement('style');
            style.id = '__pp_snapshot_stabilizer__';
            style.textContent = `
                *, *::before, *::after {
                    animation: none !important;
                    transition: none !important;
                    caret-color: transparent !important;
                }
                /* Prevent transparent body areas from showing the parent page's
                   Zoid dark backdrop in SDK/Standalone cross-origin iframe screenshots */
                html, body {
                    background-color: white !important;
                }
            `;
            document.head.appendChild(style);
        }

        if (document.fonts && document.fonts.ready) {
            try {
                await document.fonts.ready;
            } catch (error) {
                // Ignore font readiness errors and continue with frame-settle fallback.
            }
        }

        await new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(resolve);
                    });
                });
            });
        });
    });
};

export const modalSnapshot = async (testNameParts, contentWindow) => {
    const [country, integration, account, amount, testName, viewport = 'desktop'] = testNameParts.split('-');
    const viewportDimensions = screenDimensions[viewport] || screenDimensions.desktop;

    await waitForModalReady(contentWindow);
    await settleModalRendering(contentWindow);

    const modalElement = await contentWindow.$(contentWrapper);
    if (!modalElement) {
        throw new Error(`Unable to locate modal content wrapper for ${testNameParts}`);
    }

    await contentWindow.evaluate(wrapperSelector => {
        const el = document.querySelector(wrapperSelector);
        if (el) {
            // Reset inner scroll to top so header/subheadline are not cut off.
            // Also reset .content__wrapper-overflow which is the outer scrollable
            // container on the lander/webpage integration.
            el.scrollTop = 0;
            const overflow =
                el.closest('.content__wrapper-overflow') || document.querySelector('.content__wrapper-overflow');
            if (overflow) overflow.scrollTop = 0;
            el.scrollIntoView({ block: 'start', inline: 'start' });
        }
    }, contentWrapper);

    await settleModalRendering(contentWindow);

    // Final loading check: Zoid delivers real xprops after initial render, which
    // triggers useDidUpdateEffect → setLoading(true) in Container.jsx. This can
    // happen between the first waitForModalReady and the screenshot. Running
    // waitForModalReady again after settleModalRendering (which freezes
    // transitions so loading state is immediately visible via getComputedStyle)
    // catches any loading triggered by late-arriving Zoid props.
    await waitForModalReady(contentWindow);

    // Get the element's bounding box in iframe-local coordinates for logging
    const iframeLocalBox = await contentWindow.evaluate(wrapperSelector => {
        const el = document.querySelector(wrapperSelector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
            x: Math.max(0, Math.round(r.x)),
            y: Math.max(0, Math.round(r.y)),
            width: Math.max(1, Math.round(r.width)),
            height: Math.max(1, Math.round(r.height))
        };
    }, contentWrapper);

    const snapshotDimensions = iframeLocalBox || {
        x: 0,
        y: 0,
        width: viewportDimensions.width,
        height: viewportDimensions.height
    };

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    // The Zoid container on the parent page has a dark grey backdrop
    // (rgba(108,115,120,0.85)) and the modal iframe transitions from opacity 0→1.
    // Additionally, ElementHandle.boundingBox() returns iframe-local coordinates
    // for cross-origin iframes. On desktop the Zoid iframe is centered (offset
    // from 0,0), so iframe-local coords ≠ page coords → screenshot clips to the
    // wrong page region (pure backdrop). Fix: compute page-space clip by
    // combining the iframe's page position + element's iframe-local position,
    // then use page.screenshot() directly with backdrop cleared.
    const parentPage = global.page;
    let image;

    if (parentPage && parentPage !== contentWindow) {
        // SDK / Standalone / API: contentWindow is a cross-origin iframe frame.
        // 1. Find the iframe element on the parent page and get its page-space box.
        // 2. Get element's iframe-local box.
        // 3. Combine for correct page-space clip.
        // 4. Clear Zoid backdrop + snap iframe opacity before screenshotting.
        // Run sequentially (not Promise.all) to avoid CDP session conflicts between
        // concurrent evaluations on the parent page and the cross-origin frame.
        const iframePageBox = await parentPage.evaluate(() => {
            const iframeEl =
                document.querySelector('[id^="zoid-paypal-credit-modal"] > div > iframe') ||
                document.querySelector('#api-iframe');
            if (!iframeEl) return null;
            const r = iframeEl.getBoundingClientRect();
            return { x: r.x, y: r.y, width: r.width, height: r.height };
        });

        const elementLocalBox = await contentWindow.evaluate(wrapperSelector => {
            const el = document.querySelector(wrapperSelector);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                x: Math.max(0, Math.round(r.x)),
                y: Math.max(0, Math.round(r.y)),
                width: Math.max(1, Math.round(r.width)),
                height: Math.max(1, Math.round(r.height))
            };
        }, contentWrapper);

        // Clear Zoid backdrop and snap iframe to full opacity
        await parentPage.evaluate(() => {
            document.querySelectorAll('[id^="zoid-paypal-credit-modal"]').forEach(container => {
                const backdropDiv = container.querySelector(':scope > div');
                const iframe = container.querySelector(':scope > div > iframe');
                if (backdropDiv) {
                    backdropDiv.style.transition = 'none';
                    backdropDiv.style.background = 'transparent';
                }
                if (iframe) {
                    iframe.style.transition = 'none';
                    iframe.style.opacity = '1';
                }
            });
        });

        const clip =
            iframePageBox && elementLocalBox
                ? {
                      x: Math.round(iframePageBox.x + elementLocalBox.x),
                      y: Math.round(iframePageBox.y + elementLocalBox.y),
                      width: elementLocalBox.width,
                      height: elementLocalBox.height
                  }
                : snapshotDimensions;

        image = await parentPage.screenshot({ clip });
    } else {
        // Webpage / Lander: contentWindow IS the page, no cross-origin offset.
        image = await modalElement.screenshot();
    }

    const matchFunction = screenDimensions[viewport].width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/v2/snapshots/modal/${integration}/${country}/${account}/${viewport}`,
        customSnapshotIdentifier: `${amount}-${testName}-${viewport}-snap`
    });
};
