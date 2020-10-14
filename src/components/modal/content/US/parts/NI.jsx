/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useApplyNow, useContent, useServerData, useScroll, useXProps } from '../../../lib';
import Button from '../../../parts/Button';

export default ({ showApplyNow, switchTab }) => {
    // Use a ref so that the callback can be used in the useScroll handler without creating an infinite re-render
    const showApplyNowRef = useRef();
    const { onClick } = useXProps();
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { products } = useServerData();
    const { headline, subHeadline, applyNow, terms, disclaimer, copyright } = useContent('NI');

    showApplyNowRef.current = showApplyNow;

    useScroll(
        ({ target: { scrollTop } }) => {
            if (buttonRef.current) {
                const { offsetTop, clientHeight } = buttonRef.current;
                const { width: pageWidth, height: pageHeight } = document.body.getBoundingClientRect();

                const triggerOffset = pageWidth > 639 && pageHeight > 539 ? -100 : 60;

                // Ensure first that the button is being displayed
                if (scrollTop && offsetTop) {
                    if (scrollTop - offsetTop < clientHeight + triggerOffset) {
                        showApplyNowRef.current(false);
                    } else {
                        showApplyNowRef.current(true);
                    }
                }
            }
        },
        [showApplyNowRef, buttonRef.current]
    );

    return (
        <section className="content-body">
            <div className="description">
                <h2>{products.length > 1 ? headline.multiProduct : headline.singleProduct}</h2>

                <h3>{subHeadline}</h3>

                <p className="call-to-action">
                    <div>
                        <p>
                            <b>{applyNow.headline}</b>
                        </p>
                        <span>{applyNow.subHeadline}</span>
                    </div>
                    <Button onClick={handleApplyNowClick} className="apply-now" ref={buttonRef}>
                        Apply <span className="hidden-xs">Now</span>
                    </Button>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>{terms.title}</h3>
                <ul>
                    {terms.items.map(term => (
                        <li>{term}</li>
                    ))}
                </ul>
            </div>

            <p>
                <a
                    onClick={() => onClick({ linkName: 'Legal Terms' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.com/us/webapps/mpp/ppcterms"
                >
                    Click here
                </a>{' '}
                to view the PayPal Credit Terms and Conditions.
            </p>
            <p>{disclaimer}</p>
            <p>{copyright}</p>

            {switchTab ? (
                <button type="button" className="tab-switch-button" onClick={switchTab}>
                    Or see Pay in 4
                </button>
            ) : null}
        </section>
    );
};
