/* eslint-disable eslint-comments/disable-enable-pair, react/jsx-props-no-spreading */
/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useContent, useServerData, useProductMeta } from '../lib';
import Header from './Header';
import Container from './Container';
import Overlay from './Overlay';
import { LongTerm, ShortTerm } from './views';

const ContentWrapper = () => {
    const contentWrapper = useRef();
    const contentBackground = useRef();
    const contentBodyRef = useRef();

    let product;

    if (useServerData()?.views?.length > 0) {
        product = useServerData().views[0].meta.product;
    }

    const { headline, subheadline, qualifyingSubheadline = '' } = useContent(product);
    const { qualifying: isQualifying } = useProductMeta(product);

    // Add views to productView object where the keys are the product name and the values are the view component
    const productView = {
        PAY_LATER_LONG_TERM: <LongTerm {...useContent(product)} contentBodyRef={contentBodyRef} />,
        PAY_LATER_SHORT_TERM: (
            <ShortTerm {...useContent(product)} {...useProductMeta(product)} contentBodyRef={contentBodyRef} />
        )
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
