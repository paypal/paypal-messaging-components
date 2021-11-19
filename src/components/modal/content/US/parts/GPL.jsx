/** @jsx h */
import { h } from 'preact';

import Icon from '../../../parts/Icon';
import { useContent, useServerData, useProductMeta } from '../../../lib';
import { OFFER } from '../../../../../utils/constants';

export default ({ switchTab }) => {
    const { products } = useServerData();
    const { headline, subHeadline, instructions } = useContent(OFFER.PAY_LATER_SHORT_TERM);
    const { qualifying } = useProductMeta(OFFER.PAY_LATER_SHORT_TERM);

    return (
        <section className="content-body">
            <div className="description">
                <h2>{products.length > 1 && !switchTab ? headline.multiProduct : headline.singleProduct}</h2>

                <h3>
                    {qualifying.toLowerCase() === 'true'
                        ? subHeadline.qualified
                        : subHeadline.unqualified.replace(/\.00/g, '')}
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
                <h3>About Pay in 4</h3>
                <ul>
                    {qualifying.toLowerCase() === 'true' ? (
                        <li>{instructions.purchaseAmount.replace(/\.00/g, '')}</li>
                    ) : null}
                    {instructions.items.map(inst => (
                        <li>{inst}</li>
                    ))}
                </ul>
            </div>

            {switchTab ? (
                <button type="button" className="tab-switch-button" onClick={switchTab}>
                    Or see 6 months special financing
                </button>
            ) : null}
        </section>
    );
};
