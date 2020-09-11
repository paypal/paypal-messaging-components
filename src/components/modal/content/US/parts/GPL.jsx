/** @jsx h */
import { h } from 'preact';

import Icon from '../../../parts/Icon';
import { useContent, useServerData } from '../../../lib';

export default () => {
    const { products } = useServerData();
    const { content } = useContent('GPL');

    return (
        <section className="content-body">
            <div className="description">
                <h2>{products.length > 1 ? content.headline.multiProduct : content.headline.singleProduct}</h2>

                <p>{content.subHeadline}</p>

                <div className="call-to-action">
                    <div>
                        <p>
                            <span className="d-inline-block">
                                {content.instructions.title[0]}{' '}
                                <b className="dark-text">{content.instructions.title[1]}</b>
                            </span>{' '}
                            <span className="d-inline-block">
                                {content.instructions.title[2]}{' '}
                                <b className="dark-text">{content.instructions.title[3]}</b>
                            </span>
                        </p>
                    </div>
                    <Icon name="secure" />
                </div>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>About Pay in 4</h3>
                <ul>
                    {content.instructions.items.map(inst => (
                        <li>{inst}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
