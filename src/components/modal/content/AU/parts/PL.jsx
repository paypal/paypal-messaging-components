/** @jsx h */
import { h } from 'preact';
import Icon from '../../../parts/Icon';
import { useContent, useProductMeta } from '../../../lib';

const PL = () => {
    const { headline, subHeadline, terms, instructions } = useContent('GPL');
    const { qualifying: qualifyingString } = useProductMeta('GPL');
    const qualifying = qualifyingString?.toLowerCase() === 'true';

    return (
        <section className="content-body">
            <div className="description">
                <h2>{headline.singleProduct}</h2>

                <h3>{qualifying ? subHeadline.qualified : subHeadline.unqualified}</h3>

                <div className="call-to-action">
                    <div>
                        <p>
                            <span className="d-inline-block">
                                {instructions.title[0]} <b className="dark-text">{instructions.title[1]}</b>
                            </span>{' '}
                            <span className="d-inline-block">
                                {instructions.title[2]} <b className="dark-text">{instructions.title[3]}</b>
                            </span>
                        </p>
                    </div>
                    <Icon name="secure" />
                </div>
            </div>

            <hr className="divider" />

            <div className="terms">
                <ul>
                    {terms.map(term => (
                        <li>{term}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default PL;
