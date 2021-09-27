/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent } from '../../../lib';
import Header from '../../../parts/Header';

const PI30 = ({ linkClick }) => {
    const { products } = useServerData();
    const productNames = products.map(theProduct => theProduct.meta.product);

    const { headline, subHeadline, stepsList, switchingText, legalTerms } = useContent('PI30');

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
            <button type="button" className="switching-link" onClick={() => linkClick('GPL')}>
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
                {productNames.includes('GPL') && switchText}
                <div className="disclosure dashed-border transitional content-column">
                    {legalTerms.replace(/[,]00/g, '')}
                </div>
            </section>
        </Fragment>
    );
};

export default PI30;
