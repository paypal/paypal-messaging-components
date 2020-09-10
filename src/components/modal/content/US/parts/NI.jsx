/** @jsx h */
import { h } from 'preact';

import { useApplyNow, useContent } from '../../../lib';
import Button from '../../../parts/Button';

export default () => {
    const handleApplyNowClick = useApplyNow('Apply Now');

    const { content } = useContent('NI');

    return (
        <section className="content-body">
            <div className="description">
                <h2>{content.headline}</h2>

                <p>{content.subHeadline}</p>

                <p className="call-to-action">
                    <div>
                        <p>
                            <b>{content.applyNow.headline}</b>
                        </p>
                        <span>{content.applyNow.subHeadline}</span>
                    </div>
                    <Button onClick={handleApplyNowClick}>Apply Now</Button>
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
