/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useApplyNow, useContent, useServerData, useScroll, useXProps } from '../../../lib';
import Button from '../../../parts/Button';
import { createEvent } from '../../../../../utils';

export default () => {
    const { onClick } = useXProps();
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { products } = useServerData();
    const { content } = useContent('NI');

    useScroll(({ target: { scrollTop } }) => {
        const { offsetTop, clientHeight } = buttonRef.current;
        const { width: pageWidth, height: pageHeight } = document.body.getBoundingClientRect();

        const triggerOffset = pageWidth > 639 && pageHeight > 539 ? -100 : 60;

        // Ensure first that the button is being displayed
        if (scrollTop && offsetTop) {
            if (scrollTop - offsetTop < clientHeight + triggerOffset) {
                window.dispatchEvent(createEvent('apply-now-hidden'));
            } else {
                window.dispatchEvent(createEvent('apply-now-visible'));
            }
        }
    }, []);

    return (
        <section className="content-body">
            <div className="description">
                <h2>{products.length > 1 ? content.headline.multiProduct : content.headline.singleProduct}</h2>

                <p>{content.subHeadline}</p>

                <p className="call-to-action">
                    <div>
                        <p>
                            <b>{content.applyNow.headline}</b>
                        </p>
                        <span>{content.applyNow.subHeadline}</span>
                    </div>
                    <Button onClick={handleApplyNowClick} className="apply-now" ref={buttonRef}>
                        Apply <span className="hidden-xs">Now</span>
                    </Button>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>{content.terms.title}</h3>
                <ul>
                    {content.terms.items.map(term => (
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
            <p>{content.disclaimer}</p>
            <p>{content.copyright}</p>
        </section>
    );
};
