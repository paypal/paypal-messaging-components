/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useContent, useServerData, useProductMeta, useXProps } from '../lib';
import Header from './Header';
import { LongTerm, ShortTerm, NI, ProductList } from './views';

const BodyContent = () => {
    const { views } = useServerData();
    const { offer } = useXProps();

    let defaultProduct;
    const sanitizeViews = views.filter(view => view?.meta?.product !== 'PRODUCT_LIST');
    if (sanitizeViews?.length === 1) {
        defaultProduct = sanitizeViews[0]?.meta?.product;
    } else if (sanitizeViews?.length > 1) {
        defaultProduct = 'PRODUCT_LIST';
    }

    const [product, setProduct] = useState(
        offer ? views.find(view => view.meta.product === offer)?.meta.product : defaultProduct
    );
    const content = useContent(product);
    const productMeta = useProductMeta(product);

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    const openProductList = () => setProduct('PRODUCT_LIST');

    // Add views to viewComponents object where the keys are the product name and the values are the view component
    const viewComponents = {
        PAY_LATER_LONG_TERM: <LongTerm content={content} openProductList={openProductList} />,
        PAY_LATER_SHORT_TERM: (
            <ShortTerm content={content} productMeta={productMeta} openProductList={openProductList} />
        ),
        PAYPAL_CREDIT_NO_INTEREST: <NI content={content} openProductList={openProductList} />,
        PRODUCT_LIST: <ProductList content={content} setProduct={setProduct} />
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
            {viewComponents[product]}
        </Fragment>
    );
};

export default BodyContent;
