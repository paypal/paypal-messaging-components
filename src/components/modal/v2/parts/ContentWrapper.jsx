/* eslint-disable eslint-comments/disable-enable-pair, react/jsx-props-no-spreading */
/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useContent, useServerData, useProductMeta } from '../lib';
import Header from './Header';
import Container from './Container';
import Overlay from './Overlay';
import { LongTerm, PayInFour } from './views';

const ContentWrapper = () => {
    const contentWrapper = useRef();

    let product;
    if (useServerData()?.views?.length > 0) {
        product = useServerData().views[0].meta.product;
    }

    const { headline, subheadline, qualifyingSubheadline } = useContent(product);
    const { qualifying: isQualifying } = useProductMeta(product);

    // Add views to productView object where the keys are the product name and the values are the view component
    const productView = {
        PAY_LATER_LONG_TERM: <LongTerm {...useContent(product)} />,
        PAY_LATER_PAY_IN_FOUR: <PayInFour {...useContent(product)} />
    };

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640}>
            <Overlay />
            <div className="content__wrapper" ref={contentWrapper}>
                <div className="content__background">
                    <Header
                        logo="logo"
                        headline={headline}
                        subheadline={subheadline}
                        isQualifying={isQualifying}
                        qualifyingSubheadline={qualifyingSubheadline}
                    />
                    {productView[product]}
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
