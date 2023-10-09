/** @jsx h */
import { h, Fragment } from 'preact';
import { useEffect, useState, useMemo } from 'preact/hooks';
import {
    useContent,
    useServerData,
    useProductMeta,
    useXProps,
    useScroll,
    useDidUpdateEffect,
    useTransitionState
} from '../lib';
import Header from './Header';
import { LongTerm, ShortTerm, NoInterest, ProductList, PayIn1 } from './views';

const VIEW_IDS = {
    // TODO: add an error view in case we receive an invalid view?
    PAYPAL_CREDIT_NO_INTEREST: 'PAYPAL_CREDIT_NO_INTEREST',
    PAY_LATER_LONG_TERM: 'PAY_LATER_LONG_TERM',
    PAY_LATER_PAY_IN_1: 'PAY_LATER_PAY_IN_1',
    PAY_LATER_SHORT_TERM: 'PAY_LATER_SHORT_TERM',
    PRODUCT_LIST: 'PRODUCT_LIST'
};

const BodyContent = () => {
    const { views } = useServerData();
    const { offer } = useXProps();
    const { scrollTo } = useScroll();
    const [transitionState] = useTransitionState();
    const primaryViewName = useMemo(() => {
        if (offer) {
            const viewName = views.find(view => view.meta.product === offer)?.meta.product;

            if (viewName) {
                return viewName;
            }
        }

        let defaultViewName;

        const productViews = views.filter(view => view?.meta?.product !== VIEW_IDS.PRODUCT_LIST);
        const hasProductList = views.find(view => view?.meta?.product === VIEW_IDS.PRODUCT_LIST);
        if (productViews?.length === 1) {
            defaultViewName = productViews[0]?.meta?.product;
        } else if (productViews?.length > 1 && hasProductList) {
            defaultViewName = VIEW_IDS.PRODUCT_LIST;
        } else if (productViews?.length > 1 && !hasProductList) {
            defaultViewName = productViews[0]?.meta?.product;
        }

        return defaultViewName;
    }, [offer, ...views.map(view => view?.meta?.product)]);

    const [viewName, setViewName] = useState(primaryViewName);
    const content = useContent(viewName);
    const productMeta = useProductMeta(viewName);

    const { headline, subheadline, qualifyingSubheadline = '', closeButtonLabel } = content;
    const isQualifying = productMeta?.qualifying;

    const openProductList = () => setViewName(VIEW_IDS.PRODUCT_LIST);

    useDidUpdateEffect(() => {
        scrollTo(0); // Reset scroll position to top when view changes
        const closeButton = window.document.querySelector('#close-btn');
        if (closeButton) closeButton.focus();
    }, [viewName]);

    useDidUpdateEffect(() => {
        // Update view when offer param dynamically changed
        setViewName(primaryViewName ?? viewName);
    }, [offer]);

    useEffect(() => {
        // Reset back to the primary view after closing the modal
        if (transitionState === 'CLOSED') {
            setViewName(primaryViewName);
        }
    }, [transitionState]);

    // Add views to viewComponents object where the keys are the product name and the values are the view component
    const viewComponents = {
        [VIEW_IDS.PAYPAL_CREDIT_NO_INTEREST]: <NoInterest content={content} openProductList={openProductList} />,
        [VIEW_IDS.PAY_LATER_LONG_TERM]: <LongTerm content={content} openProductList={openProductList} />,
        [VIEW_IDS.PAY_LATER_PAY_IN_1]: <PayIn1 content={content} openProductList={openProductList} />,
        [VIEW_IDS.PAY_LATER_SHORT_TERM]: (
            <ShortTerm content={content} productMeta={productMeta} openProductList={openProductList} />
        ),
        [VIEW_IDS.PRODUCT_LIST]: <ProductList content={content} setViewName={setViewName} />
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
                closeButtonLabel={closeButtonLabel}
                viewName={viewName}
            />
            <div className="content__container">
                <main
                    className="main"
                    aria-label={`More info on the Pay Later offer${viewName === VIEW_IDS.PRODUCT_LIST ? 's' : ''}.`}
                >
                    <div className="content__body">{viewComponents[viewName]}</div>
                </main>
            </div>
        </Fragment>
    );
};

export default BodyContent;
