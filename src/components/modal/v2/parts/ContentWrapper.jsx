/** @jsx h */
import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useContent, useServerData, useProduct, useProductMeta } from '../lib';
import Header from './Header';
import Container from './Container';
import Overlay from './Overlay';
import { LongTerm, ShortTerm, ProductList } from './views';

const ContentWrapper = () => {
    const { views } = useServerData();
    const contentWrapper = useRef();
    const contentBackground = useRef();
    const contentBodyRef = useRef();
    const content = useContent(product);
    const productMeta = useProductMeta(product);

    let defaultProduct;
    if (views?.length === 1) {
        defaultProduct = views[0].meta.product;
    }
    if (views?.length > 1) {
        defaultProduct = 'PRODUCT_LIST';
    }
    const [product, setProduct] = useState(defaultProduct);

    console.log({
        viewsLength: views?.length,
        views,
        serverData: useServerData(),
        product: useProduct(product)
    });

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    // Add views to productViewComponents object where the keys are the product name and the values are the view component
    const productViewComponents = {
        PAY_LATER_LONG_TERM: <LongTerm {...useContent(product)} contentBodyRef={contentBodyRef} />,
        PAY_LATER_SHORT_TERM: <ShortTerm content={content} productMeta={productMeta} contentBodyRef={contentBodyRef} />,
        PRODUCT_LIST: <ProductList {...useContent(product)} setProduct={setProduct} contentBodyRef={contentBodyRef} />
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
