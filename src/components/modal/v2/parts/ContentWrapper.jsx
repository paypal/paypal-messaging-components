/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useContent, useServerData, useProductMeta, useXProps } from '../lib';
import Header from './Header';
import Container from './Container';
import Overlay from './Overlay';
import { LongTerm, ShortTerm, NI } from './views';

const ContentWrapper = () => {
    const { views } = useServerData();
    const contentWrapper = useRef();
    const contentBackground = useRef();
    const contentBodyRef = useRef();

    const { offer } = useXProps();
    const product = views.find(view => view.meta.product === offer)?.meta.product ?? views[0].meta.product;
    const content = useContent(product);
    const productMeta = useProductMeta(product);

    const { headline, subheadline, qualifyingSubheadline = '' } = content;
    const isQualifying = productMeta?.qualifying;

    // Add views to productView object where the keys are the product name and the values are the view component
    const productView = {
        PAY_LATER_LONG_TERM: <LongTerm content={content} contentBodyRef={contentBodyRef} />,
        PAY_LATER_SHORT_TERM: <ShortTerm content={content} productMeta={productMeta} contentBodyRef={contentBodyRef} />,
        PAYPAL_CREDIT_NO_INTEREST: <NI content={content} contentBodyRef={contentBodyRef} />
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
                    {productView[product]}
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
