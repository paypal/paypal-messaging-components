/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useContent, useServerData, useProductMeta } from '../lib';
import Header from './Header';
import { LongTerm, ShortTerm, NI } from './views';

const BodyContent = () => {
    const { views } = useServerData();
    const [product, setProduct] = useState();
    const content = useContent(product);
    const productMeta = useProductMeta(product);

    if (views?.length > 0) {
        setProduct(views[0].meta.product);
    }

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    // Add views to productView object where the keys are the product name and the values are the view component
    const productView = {
        PAY_LATER_LONG_TERM: <LongTerm content={content} />,
        PAY_LATER_SHORT_TERM: <ShortTerm content={content} productMeta={productMeta} />,
        PAYPAL_CREDIT_NO_INTEREST: <NI content={content} />
    };

    // IMPORTANT: These elements cannot be nested inside of other elements.
    // They are using very precise CSS position sticky rules that require this
    // specific adjacent DOM structure
    return (
        <Fragment>
            <Header
                logo="logo"
                headline={headline}
                subheadline={subheadline}
                isQualifying={isQualifying ?? 'false'}
                qualifyingSubheadline={qualifyingSubheadline}
            />
            {productView[product]}
        </Fragment>
    );
};

export default BodyContent;
