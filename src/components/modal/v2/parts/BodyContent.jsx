/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useContent, useServerData, useProductMeta, useXProps, useScroll, useDidUpdateEffect } from '../lib';
import Header from './Header';
import { LongTerm, ShortTerm, NI, ProductList } from './views';

const BodyContent = () => {
    const { views } = useServerData();
    const { offer } = useXProps();
    const { scrollTo } = useScroll();

    let defaultViewName;
    const sanitizeViews = views.filter(view => view?.meta?.product !== 'PRODUCT_LIST');
    if (sanitizeViews?.length === 1) {
        defaultViewName = sanitizeViews[0]?.meta?.product;
    } else if (sanitizeViews?.length > 1) {
        defaultViewName = 'PRODUCT_LIST';
    }

    const [viewName, setViewName] = useState(
        offer ? views.find(view => view.meta.product === offer)?.meta.product : defaultViewName
    );
    const content = useContent(viewName);
    const productMeta = useProductMeta(viewName);

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    const openProductList = () => setViewName('PRODUCT_LIST');

    useDidUpdateEffect(() => {
        scrollTo(0); // Reset scroll position to top when view changes
    }, [viewName]);

    useDidUpdateEffect(() => {
        // Update view when offer param dynamically changed
        setViewName(views.find(view => view.meta.product === offer)?.meta.product ?? viewName);
    }, [offer]);

    // Add views to viewComponents object where the keys are the product name and the values are the view component
    const viewComponents = {
        PAY_LATER_LONG_TERM: <LongTerm content={content} openProductList={openProductList} />,
        PAY_LATER_SHORT_TERM: (
            <ShortTerm content={content} productMeta={productMeta} openProductList={openProductList} />
        ),
        PAYPAL_CREDIT_NO_INTEREST: <NI content={content} openProductList={openProductList} />,
        PRODUCT_LIST: <ProductList content={content} setViewName={setViewName} />
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
            {viewComponents[viewName]}
        </Fragment>
    );
};

export default BodyContent;
