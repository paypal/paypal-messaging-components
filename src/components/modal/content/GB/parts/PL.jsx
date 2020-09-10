/** @jsx h */
import { h, Fragment } from 'preact';
import Icon from '../../../parts/Icon';
import { useContent } from '../../../lib';

const headline = () => {
    const { content, meta } = useContent('GPL');

    if (meta.periodicPayment === '-' || meta.amount < meta.minAmount || meta.amount > meta.maxAmount) {
        return (
            <h1 className="offer">
                {content.headline.unqualified[0]} <br /> {content.headline.unqualified[1]}
            </h1>
        );
    }

    return (
        <h1 className="offer">
            {content.headline.qualified[0].replace(/\.00/g, '')} <br />{' '}
            {content.headline.qualified[1].replace(/\.00/g, '')}
        </h1>
    );
};

const PL = () => {
    const { content, meta } = useContent('GPL');

    return (
        <div className="content-body">
            <div className="left">
                {headline()}
                <p className="subheadline">
                    {meta.periodicPayment !== '-' ? content.subHeadline.qualified : content.subHeadline.unqualified}
                </p>
                <Icon name="icecream" />
                <div className="thumbs-up">
                    <Icon name="thumbs-up" />
                </div>
                <div className="terms">
                    <p>
                        {content.terms.map(term => (
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
                    {content.instructions.map(([icon, ...text]) => (
                        <Fragment>
                            <Icon name={icon} />
                            <p>
                                {text.map((textPart, idx) => (
                                    <Fragment>
                                        {idx !== 0 && textPart !== 'PRODUCT_NAME' ? <br /> : null}
                                        {textPart === 'PRODUCT_NAME' ? <span>{content.productName}</span> : textPart}
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
