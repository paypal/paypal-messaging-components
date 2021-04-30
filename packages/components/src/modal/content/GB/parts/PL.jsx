/** @jsx h */
import { h, Fragment } from 'preact';
import Icon from '../../../parts/Icon';
import { useContent, useProductMeta } from '../../../lib';

const replaceZeros = string => string.replace(/\.00/g, '');

const PL = () => {
    const { headline, subHeadline, terms, instructions } = useContent('GPL');
    const { qualifying: qualifyingString } = useProductMeta('GPL');
    const qualifying = qualifyingString?.toLowerCase() === 'true';

    return (
        <section className="content-body">
            <div className="description">
                <h2>{headline.singleProduct}</h2>

                <h3>
                    {subHeadline.pay.start} {qualifying && `${subHeadline.pay.amount} `}
                    {subHeadline.pay.end} {replaceZeros(subHeadline.available)} {subHeadline.apply}
                </h3>

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
                <p>
                    {terms.map(term => (
                        <Fragment>
                            {term}
                            <br />
                        </Fragment>
                    ))}
                    Click{' '}
                    <a
                        href="https://www.paypal.com/uk/webapps/mpp/paypal-payin3/faq"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        here
                    </a>{' '}
                    to learn more about Pay in 3.
                </p>
            </div>
        </section>
    );
};

export default PL;
