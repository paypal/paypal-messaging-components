/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent, useProductMeta } from '../../../lib';
import Header from '../../../parts/Header';
import Calculator from './Calculator';

export default ({ selectProduct, cornerRef }) => {
    const { products } = useServerData();
    const { headline, instructions, switchingText, disclosure } = useContent('GPL');
    const { apr } = useProductMeta('GPL');

    const switchText = (
        <div className="content-column switching-text">
            <p>
                {switchingText[0]}
                <button type="button" className="switching-link" onClick={() => selectProduct('PI30')}>
                    {switchingText[1]}
                </button>
            </p>
        </div>
    );

    const disclosureText = (apr === '0.00' ? disclosure.zeroAPR : disclosure.nonZeroAPR).replace(/[.,]00/g, '');

    return (
        <Fragment>
            <Header logo="DE-GPL">
                <h1>{headline}</h1>
            </Header>
            <span className="corner" ref={cornerRef} />
            <section className="content-body gpl">
                <div className="description">
                    <Calculator />
                    <div className="content-column instructions transitional">
                        {instructions.map(instruction =>
                            instruction === 'PayPal' ? <b>PayPal </b> : <span>{instruction} </span>
                        )}
                    </div>
                </div>
                <div className="content-footer">
                    {products.length > 1 && switchText}
                    <div className="content-column disclosure dashed-border transitional">{disclosureText}</div>
                </div>
            </section>
        </Fragment>
    );
};
