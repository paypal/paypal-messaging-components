/** @jsx h */
import { h } from 'preact';

import { useApplyNow, useContent, useServerData } from '../../../lib';
import Button from '../../../parts/Button';

export default () => {
    const handleApplyNowClick = useApplyNow('Apply Now');

    const { products } = useServerData();
    const { content } = useContent('NI');

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
                    <Button onClick={handleApplyNowClick} className="apply-now">
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
