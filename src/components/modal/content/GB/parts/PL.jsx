/** @jsx h */
import { h, Fragment } from 'preact';
import Icon from '../../../parts/Icon';
import { useContent, useProductMeta } from '../../../lib';

const headline = () => {
    const {
        headline: { unqualified, qualified }
    } = useContent('GPL');

    const { qualifying } = useProductMeta('GPL');

    if (qualifying !== 'TRUE') {
        return (
            <h1 className="offer">
                {unqualified[0]} <br /> {unqualified[1]}
            </h1>
        );
    }

    return (
        <h1 className="offer">
            {qualified[0].replace(/\.00/g, '')} <br /> {qualified[1].replace(/\.00/g, '')}
        </h1>
    );
};

const PL = () => {
    const { subHeadline, terms, instructions, productName } = useContent('GPL');
    const { qualifying } = useProductMeta('GPL');

    return (
        <div className="content-body">
            <div className="left">
                {headline()}
                <p className="subheadline">{qualifying === 'TRUE' ? subHeadline.qualified : subHeadline.unqualified}</p>
                <Icon name="icecream" />
                <div className="thumbs-up">
                    <Icon name="thumbs-up" />
                </div>
                <div className="terms">
                    <p>
                        {terms.map(term => (
                            <Fragment>
                                {term}
                                <br />
                            </Fragment>
                        ))}
                    </p>
                </div>
            </div>
            <div className="right">
                <h2 className="title">Buy now, pay later</h2>
                <div className="info">
                    {instructions.map(([icon, ...text]) => (
                        <Fragment>
                            <Icon name={icon} />
                            <p>
                                {text.map((textPart, idx) => (
                                    <Fragment>
                                        {idx !== 0 && textPart !== 'PRODUCT_NAME' ? <br /> : null}
                                        {textPart === 'PRODUCT_NAME' ? <span> {productName}</span> : textPart}
                                    </Fragment>
                                ))}
                            </p>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PL;
