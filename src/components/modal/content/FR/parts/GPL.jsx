/** @jsx h */
import { h, Fragment } from 'preact';

import Icon from '../../../parts/Icon';
import { useContent, useProductMeta } from '../../../lib';

const replaceZeros = string => string.replace(/,00/g, '');

export default () => {
    const { headline, subHeadline, instructions, terms } = useContent('GPL');
    const { qualifying } = useProductMeta('GPL');

    return (
        <section className="content-body">
            <div className="description">
                <h2>{headline.singleProduct}</h2>

                <h3>
                    {qualifying.toLowerCase() === 'true'
                        ? subHeadline.qualified
                        : replaceZeros(subHeadline.unqualified)}
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
                <h3>À propos du Paiement en 4X</h3>
                <ul>
                    {instructions.items.map(inst => (
                        <li>{replaceZeros(inst)}</li>
                    ))}
                </ul>
                <div className="terms">
                    <p>
                        {terms.map(term => {
                            let termContent = term;
                            if (Array.isArray(term)) {
                                termContent = (
                                    <Fragment>
                                        {`${term[0]} `}
                                        <a
                                            href="https://www.paypal.com/fr/webapps/mpp/ua/pay-in-4x-full"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {term[1]}
                                        </a>
                                        {` ${term[2]}`}
                                    </Fragment>
                                );
                            }
                            return (
                                <p>
                                    {termContent}
                                    <br />
                                </p>
                            );
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
};
