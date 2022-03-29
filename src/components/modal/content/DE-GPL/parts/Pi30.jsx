/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent } from '../../../lib';
import Header from '../../../parts/Header';
import { getStandardProductOffer } from '../../../../../utils/miscellaneous';
import { OFFER } from '../../../../../utils/constants';

const PI30 = ({ linkClick }) => {
    const { products } = useServerData();
    const productNames = products.map(theProduct =>
        getStandardProductOffer(theProduct.meta.product, theProduct.meta.offerCountry)
    );

    const { headline, subHeadline, stepsList, switchingText, legalTerms } = useContent(OFFER.PAY_LATER_PAY_IN_1);

    const list = [];
    for (let i = 1; i <= stepsList.length; i++) {
        list.push(
            <div className="row">
                <div className="list-number">
                    <div />
                    <span>{i}</span>
                </div>
                <p>{stepsList[i - 1]}</p>
                <br />
            </div>
        );
    }

    const switchText = (
        <p className="switching-text content-column">
            {switchingText[0]}
            <button type="button" className="switching-link" onClick={() => linkClick(OFFER.PAY_LATER_LONG_TERM)}>
                {switchingText[1]}
            </button>
        </p>
    );

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1 className="pi30-headline">{headline}</h1>
                <h3 className="pi30-subheadline">{subHeadline.replace(/[,]00/g, '')}</h3>
            </Header>
            <section className="content-body pi30">
                <div className="instructions transitional content-column">{list}</div>
                {productNames.includes(OFFER.PAY_LATER_LONG_TERM) && switchText}
                <div className="disclosure dashed-border transitional content-column">
                    {legalTerms.replace(/[,]00/g, '')}
                </div>
            </section>
        </Fragment>
    );
};

export default PI30;
