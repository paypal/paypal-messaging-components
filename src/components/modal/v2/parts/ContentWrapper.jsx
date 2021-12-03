/** @jsx h */
import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useContent, useServerData, useProductMeta } from '../lib';
import Header from './Header';
import Container from './Container';
import Overlay from './Overlay';
import { LongTerm, ShortTerm, NI, ProductList } from './views';

const ContentWrapper = () => {
    const { views } = useServerData();
    const contentWrapper = useRef();
    const contentBackground = useRef();
    const contentBodyRef = useRef();

    let defaultProduct;
    const sanitizeViews = views.filter(view => view?.meta?.product !== 'PRODUCT_LIST');
    if (sanitizeViews?.length === 1) {
        defaultProduct = sanitizeViews[0]?.meta?.product;
    } else if (sanitizeViews?.length > 1) {
        defaultProduct = 'PRODUCT_LIST';
    }

    const [product, setProduct] = useState(defaultProduct);
    const content = useContent(product);
    const productMeta = useProductMeta(product);

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    // Add views to productViewComponents object where the keys are the product name and the values are the view component
    const productViewComponents = {
        PAY_LATER_LONG_TERM: <LongTerm content={content} contentBodyRef={contentBodyRef} />,
        PAY_LATER_SHORT_TERM: <ShortTerm content={content} productMeta={productMeta} contentBodyRef={contentBodyRef} />,
        PAYPAL_CREDIT_NO_INTEREST: <NI content={content} contentBodyRef={contentBodyRef} />,
        PRODUCT_LIST: <ProductList content={content} setProduct={setProduct} contentBodyRef={contentBodyRef} />
    };

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640}>
            <Overlay />
            <div className="content__wrapper" ref={contentWrapper}>
                <div className="content__background" ref={contentBackground}>
                    <Header
                        logo="logo"
                        headline={headline}
                        subheadline={subheadline}
                        isQualifying={isQualifying ?? 'false'}
                        qualifyingSubheadline={qualifyingSubheadline}
                        contentWrapper={contentWrapper}
                        contentBodyRef={contentBodyRef}
                        contentBackground={contentBackground}
                    />
                    {productViewComponents[product]}
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
