/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useServerData, useContent, useProductMeta } from '../../../lib';
import Header from '../../../parts/Header';
import Calculator from './Calculator';
import { getStandardProductOffer } from '../../../../../utils/miscellaneous';

export default ({ linkClick }) => {
    const { products } = useServerData();
    const productNames = products.map(theProduct =>
        getStandardProductOffer(theProduct.meta.product, theProduct.meta.offerCountry)
    );
    const { headline, instructions, switchingText, disclosure } = useContent('PAY_LATER_LONG_TERM');
    const { apr } = useProductMeta('PAY_LATER_LONG_TERM');

    // GPL-specific style changes because calculator continues header
    function stylizeHeaderForGPL() {
        document.querySelector('.header').style.paddingBottom = 0;
        document.querySelector('.header>h1').style.paddingBottom = 0;
    }

    useEffect(() => {
        stylizeHeaderForGPL();
    }, []);

    const switchText = (
        <p className="switching-text">
            {switchingText[0]}
            <button type="button" className="switching-link" onClick={() => linkClick('PAY_LATER_PAY_IN_1')}>
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
                    {productNames.includes('PAY_LATER_PAY_IN_1') && switchText}
                    <div className="disclosure dashed-border transitional">{disclosureText}</div>
                </div>
            </section>
        </Fragment>
    );
};
