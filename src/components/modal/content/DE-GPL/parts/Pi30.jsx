/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent } from '../../../lib';
import Header from '../../../parts/Header';

const PI30 = ({ selectProduct, cornerRef }) => {
    const { products } = useServerData();

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
        <div className="content-column">
            <p className="switching-text">
                {switchingText[0]}
                <button type="button" className="switching-link" onClick={() => selectProduct('GPL')}>
                    {switchingText[1]}
                </button>
            </p>
        </div>
    );

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1 className="pi30-headline">{headline}</h1>
                <h3 className="pi30-subheadline">{subHeadline}</h3>
            </Header>
            <span className="corner" ref={cornerRef} />
            <section className="content-body pi30">
                <div className="content-column instructions transitional">{list}</div>
                {products.length > 1 && switchText}
                <div className="content-column disclosure transitional">{legalTerms}</div>
            </section>
        </Fragment>
    );
};

export default PI30;
