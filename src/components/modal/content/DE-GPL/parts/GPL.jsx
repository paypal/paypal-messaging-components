/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent, useProductMeta } from '../../../lib';
import Header from '../../../parts/Header';
import Calculator from './Calculator';

export default ({ linkClick, cornerRef }) => {
    const { products } = useServerData();
    const { headline, instructions, switchingText, disclosure } = useContent('GPL');
    const { apr } = useProductMeta('GPL');

    const switchText = (
        <p className="switching-text">
            {switchingText[0]}
            <button type="button" className="switching-link" onClick={() => linkClick('PI30')}>
                {switchingText[1]}
            </button>
        </p>
    );

    const disclosureText = (apr === '0.00' ? disclosure.zeroAPR : disclosure.nonZeroAPR).replace(/[,]00/g, '');

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1>{headline}</h1>
            </Header>
            <span className="corner" ref={cornerRef} />
            <section className="content-body gpl">
                <div className="description">
                    <Calculator />
                    <div className="instructions transitional content-column">
                        {instructions.map(instruction =>
                            instruction === 'PayPal' ? <b>PayPal </b> : <span>{instruction} </span>
                        )}
                    </div>
                </div>
                <div className="content-footer content-column">
                    {products.length > 1 && switchText}
                    <div className="disclosure dashed-border transitional">{disclosureText}</div>
                </div>
            </section>
        </Fragment>
    );
};
