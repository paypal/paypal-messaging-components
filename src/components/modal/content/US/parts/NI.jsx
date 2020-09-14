/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useApplyNow, useContent, useServerData, useScroll } from '../../../lib';
import Button from '../../../parts/Button';
import { createEvent } from '../../../../../utils';

export default () => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { products } = useServerData();
    const { content } = useContent('NI');

    useScroll(({ target: { scrollTop } }) => {
        const { offsetTop, clientHeight } = buttonRef.current;
        console.log(scrollTop, offsetTop, scrollTop - offsetTop, clientHeight);

        // Ensure first that the button is being displayed
        if (scrollTop && offsetTop) {
            if (scrollTop - offsetTop < clientHeight + 60) {
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
        </section>
    );
};
